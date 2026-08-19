let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
  }
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
  return ctx;
}

/** A gently-filtered sine tone with a smooth attack/release — no clicks. */
function playTone(freq: number, duration: number, gain: number) {
  const audioCtx = getContext();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const filter = audioCtx.createBiquadFilter();
  const gainNode = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.value = freq;
  filter.type = "lowpass";
  filter.frequency.value = freq * 2.2;
  filter.Q.value = 0.5;

  const now = audioCtx.currentTime;
  const attack = Math.min(0.04, duration * 0.35);
  const release = duration - attack;

  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(gain, now + attack);
  gainNode.gain.linearRampToValueAtTime(0, now + attack + release);

  osc.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.03);
}

/** A soft two-note chime — played when the cursor enters a hoverable element. */
export function playHoverTick() {
  const audioCtx = getContext();
  if (!audioCtx) return;

  const notes: [freq: number, startOffset: number, duration: number, gain: number][] = [
    [1046.5, 0, 0.09, 0.03], // C6
    [1568, 0.045, 0.11, 0.026], // G6
  ];

  for (const [freq, startOffset, duration, gain] of notes) {
    const osc = audioCtx.createOscillator();
    const filter = audioCtx.createBiquadFilter();
    const gainNode = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.value = freq;
    filter.type = "lowpass";
    filter.frequency.value = freq * 1.8;
    filter.Q.value = 0.3;

    const start = audioCtx.currentTime + startOffset;
    const attack = 0.012;

    gainNode.gain.setValueAtTime(0, start);
    gainNode.gain.linearRampToValueAtTime(gain, start + attack);
    gainNode.gain.exponentialRampToValueAtTime(0.0008, start + duration);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.02);
  }
}

/** A short, slightly lower tick — played on click/tap. */
export function playClickTick() {
  playTone(520, 0.1, 0.05);
}

export type ChargeHandle = { stop: () => void };

/**
 * Starts a rising-pitch "charging up to its limit" tone — used while the
 * user long-presses. Pitch and volume climb continuously; call stop() on
 * release, or it auto-stops (with a final released "snap") once it hits
 * the pitch ceiling after maxDurationMs.
 */
export function startChargeSound(maxDurationMs = 900): ChargeHandle {
  const audioCtx = getContext();
  if (!audioCtx) return { stop: () => {} };

  const osc = audioCtx.createOscillator();
  const filter = audioCtx.createBiquadFilter();
  const gainNode = audioCtx.createGain();

  osc.type = "sawtooth";
  filter.type = "lowpass";
  filter.Q.value = 4;

  const now = audioCtx.currentTime;
  const maxDuration = maxDurationMs / 1000;

  osc.frequency.setValueAtTime(140, now);
  osc.frequency.exponentialRampToValueAtTime(900, now + maxDuration);
  filter.frequency.setValueAtTime(300, now);
  filter.frequency.exponentialRampToValueAtTime(3200, now + maxDuration);

  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.05, now + 0.08);
  gainNode.gain.linearRampToValueAtTime(0.07, now + maxDuration);

  osc.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.start(now);

  let stopped = false;
  const releaseAt = (whenFromNow: number) => {
    if (stopped) return;
    stopped = true;
    const t = audioCtx.currentTime;
    gainNode.gain.cancelScheduledValues(t);
    gainNode.gain.setValueAtTime(gainNode.gain.value, t);
    gainNode.gain.linearRampToValueAtTime(0, t + whenFromNow);
    osc.stop(t + whenFromNow + 0.02);
  };

  const ceilingTimer = window.setTimeout(() => releaseAt(0.12), maxDurationMs);

  return {
    stop: () => {
      window.clearTimeout(ceilingTimer);
      releaseAt(0.08);
    },
  };
}

/** A noise-burst "explosion" — played when the growing label bursts past its size limit. */
export function playBlast() {
  const audioCtx = getContext();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;
  const duration = 0.4;

  const bufferSize = Math.ceil(audioCtx.sampleRate * duration);
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;

  const filter = audioCtx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(3200, now);
  filter.frequency.exponentialRampToValueAtTime(200, now + duration);

  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0.18, now);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

  // A brief low thump under the noise for weight.
  const thump = audioCtx.createOscillator();
  const thumpGain = audioCtx.createGain();
  thump.type = "sine";
  thump.frequency.setValueAtTime(120, now);
  thump.frequency.exponentialRampToValueAtTime(40, now + 0.15);
  thumpGain.gain.setValueAtTime(0.12, now);
  thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

  noise.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  thump.connect(thumpGain);
  thumpGain.connect(audioCtx.destination);

  noise.start(now);
  noise.stop(now + duration);
  thump.start(now);
  thump.stop(now + 0.2);
}
