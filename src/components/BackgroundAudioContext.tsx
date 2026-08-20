"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";

type BackgroundAudioContextValue = {
  playing: boolean;
  toggle: () => void;
  trackTitle: string;
};

const BackgroundAudioContext = createContext<BackgroundAudioContextValue | null>(null);

// Module-level persistent singleton so audio NEVER pauses or resets on route changes
let globalAudio: HTMLAudioElement | null = null;

function getOrCreateGlobalAudio(): HTMLAudioElement {
  if (!globalAudio && typeof window !== "undefined") {
    globalAudio = new Audio("/audio/dancin.mp3");
    globalAudio.loop = true;
    globalAudio.volume = 0.65;
    globalAudio.preload = "auto";
  }
  return globalAudio!;
}

export function BackgroundAudioProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(() => {
    if (typeof window !== "undefined" && globalAudio) {
      return !globalAudio.paused;
    }
    return false;
  });

  const trackTitle = "Aaron Smith — Dancin (KRONO Remix)";

  useEffect(() => {
    const audio = getOrCreateGlobalAudio();
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    // Sync initial state
    setPlaying(!audio.paused);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = getOrCreateGlobalAudio();
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch((err) => {
          console.warn("Audio playback interrupted or blocked by browser:", err);
        });
    } else {
      audio.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <BackgroundAudioContext.Provider value={{ playing, toggle, trackTitle }}>
      {children}
      {/* Global persistent floating sound indicator (visible when audio is playing or on other pages) */}
      <GlobalPersistentAudioWidget />
    </BackgroundAudioContext.Provider>
  );
}

function GlobalPersistentAudioWidget() {
  const { playing, toggle, trackTitle } = useBackgroundAudio();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  if (!show || !playing) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[999] animate-fade-in pointer-events-auto">
      <button
        onClick={toggle}
        data-cursor-hover
        className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0a0a0a]/90 backdrop-blur-md text-white text-xs font-mono border border-white/20 shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
        title="Click to Pause Background Music"
      >
        {/* Animated Dancing Equalizer Bars */}
        <div className="flex items-end gap-0.5 h-3.5 w-3.5 justify-center">
          <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_infinite_ease-in-out] h-full" />
          <span className="w-0.5 bg-white rounded-full animate-[bounce_0.8s_infinite_0.2s_ease-in-out] h-full" />
          <span className="w-0.5 bg-white rounded-full animate-[bounce_0.5s_infinite_0.4s_ease-in-out] h-full" />
        </div>
        <span className="text-[11px] font-semibold tracking-wide">
          {trackTitle}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
      </button>
    </div>
  );
}

export function useBackgroundAudio() {
  const ctx = useContext(BackgroundAudioContext);
  if (!ctx) throw new Error("useBackgroundAudio must be used within BackgroundAudioProvider");
  return ctx;
}
