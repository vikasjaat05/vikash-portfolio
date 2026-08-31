"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  PhoneOff,
  Sparkles,
  Globe2,
  ArrowUpRight,
  Brain,
  Send,
  Mic,
  MicOff,
  Volume2,
} from "lucide-react";

type ActionCard = { label: string; url: string };

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}
interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((e: Event) => void) | null;
  onend: ((e: Event) => void) | null;
  onerror: ((e: Event) => void) | null;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
}
declare global {
  interface Window {
    SpeechRecognition?: new () => ISpeechRecognition;
    webkitSpeechRecognition?: new () => ISpeechRecognition;
  }
}

// ─── Pre-recorded ElevenLabs Studio HD Audio Tracks ─────────────────────────
const STUDIO_TRACKS: Record<string, string> = {
  greeting: "/audio/eva/greeting_namaste.mp3",
  greeting_short: "/audio/eva/greeting.mp3",
  work: "/audio/eva/product_flaneur.mp3",
  pricing: "/audio/eva/ecommerce_pricing.mp3",
  contact: "/audio/eva/contact_direct.mp3",
  about: "/audio/eva/about_story.mp3",
  services: "/audio/eva/skills_services.mp3",
  reviews: "/audio/eva/reviews.mp3",
};

// ─── Project intelligence brief ─────────────────────────────────────────────
type ProjectBrief = {
  salutation?: string;
  project?: string;
  platform?: string;
  products?: string;
  style?: string;
  budget?: string;
  timeline?: string;
};

const QUICK_PROMPTS = [
  "💼 Show Vikash's Projects",
  "🛍️ Shopify Store Pricing",
  "✉️ Contact Vikash",
  "✨ Who is Vikash?",
];

export default function VoiceNavigator() {
  const [isOpen, setIsOpen] = useState(false);
  const [userTranscript, setUserTranscript] = useState("");
  const [evaText, setEvaText] = useState(
    "Namaste! Main Eva hoon, Vikash Choudhary ki AI consultant. Aapka shubh naam kya hai?"
  );
  const [actions, setActions] = useState<ActionCard[]>([]);
  const [brief, setBrief] = useState<ProjectBrief>({});
  const [inputText, setInputText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const isOpenRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const isMutedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recRef = useRef<ISpeechRecognition | null>(null);
  const wakeRef = useRef<ISpeechRecognition | null>(null);
  const conversationStateRef = useRef<Record<string, string>>({});
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Handlers refs to avoid circular dependencies
  const startListeningRef = useRef<() => void>(() => {});
  const processQueryRef = useRef<(q: string) => void>(() => {});
  const speakResponseRef = useRef<(text: string, trackKey?: string) => void>(() => {});

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);
  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // ── Active Speech Recognition inside Modal ────────────────────────────────
  const startActiveListening = useCallback(() => {
    const SRC = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SRC || isSpeakingRef.current || isMutedRef.current || !isOpenRef.current) return;

    try {
      recRef.current?.abort();
      const rec = new SRC();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-IN";

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (e: SpeechRecognitionEvent) => {
        if (isSpeakingRef.current) return; // Prevent echo
        let transcript = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          transcript += e.results[i][0].transcript;
        }
        if (!transcript.trim()) return;

        setUserTranscript(transcript.trim());
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
          rec.abort();
          setIsListening(false);
          processQueryRef.current(transcript);
        }, 700);
      };

      rec.onerror = (e) => {
        console.warn("SpeechRec error:", e);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
        if (isOpenRef.current && !isSpeakingRef.current && !isMutedRef.current) {
          setTimeout(() => {
            if (isOpenRef.current && !isSpeakingRef.current && !isMutedRef.current) {
              try {
                rec.start();
              } catch {
                /* */
              }
            }
          }, 350);
        }
      };

      recRef.current = rec;
      rec.start();
    } catch (err) {
      console.warn("SpeechRec start exception:", err);
    }
  }, []);

  useEffect(() => {
    startListeningRef.current = startActiveListening;
  }, [startActiveListening]);

  // ── Speak text (Studio audio track if matched, else natural speech) ───────
  const speakResponse = useCallback((text: string, studioTrackKey?: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    recRef.current?.abort();
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(true);
    setIsListening(false);

    // If matching ElevenLabs Studio MP3 is available, play it!
    if (studioTrackKey && STUDIO_TRACKS[studioTrackKey]) {
      const audio = new Audio(STUDIO_TRACKS[studioTrackKey]);
      audioRef.current = audio;
      const onDone = () => {
        setIsSpeaking(false);
        audioRef.current = null;
        if (isOpenRef.current && !isMutedRef.current) {
          startListeningRef.current();
        }
      };
      audio.onended = onDone;
      audio.onerror = () => {
        speakWithBrowser(text);
      };
      audio.play().catch(() => {
        speakWithBrowser(text);
      });
      return;
    }

    speakWithBrowser(text);
  }, []);

  const speakWithBrowser = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setIsSpeaking(false);
      if (isOpenRef.current && !isMutedRef.current) {
        startListeningRef.current();
      }
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find((v) => /hi-IN|en-IN/i.test(v.lang) && /female|swara|lekha|priya/i.test(v.name)) ||
      voices.find((v) => /hi-IN|en-IN/i.test(v.lang)) ||
      voices.find((v) => /samantha|karen|victoria|zira/i.test(v.name)) ||
      voices[0];

    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.rate = 1.05;
    utterance.pitch = 1.05;

    utterance.onend = () => {
      setIsSpeaking(false);
      if (isOpenRef.current && !isMutedRef.current) {
        startListeningRef.current();
      }
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      if (isOpenRef.current && !isMutedRef.current) {
        startListeningRef.current();
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    speakResponseRef.current = speakResponse;
  }, [speakResponse]);

  // ── Process User Query via EVA Brain API ──────────────────────────────────
  const processQuery = useCallback(async (rawQuery: string) => {
    const query = rawQuery.trim();
    if (!query) return;

    setUserTranscript(query);
    setIsListening(false);

    try {
      const res = await fetch("/api/eva-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          conversationState: conversationStateRef.current,
        }),
      });

      if (!res.ok) throw new Error("EVA API failed");
      const data = await res.json();

      conversationStateRef.current = data.conversationState || {};
      setEvaText(data.reply);
      if (data.suggestedActions) {
        setActions(data.suggestedActions);
      }

      // Update Project Brief
      const q = query.toLowerCase();
      const briefUpdates: Partial<ProjectBrief> = {};
      if (data.conversationState?.salutation) {
        briefUpdates.salutation = data.conversationState.salutation;
      }
      if (/shopify/.test(q)) briefUpdates.platform = "Shopify 2.0 ✓";
      if (/wordpress|woocommerce/.test(q)) briefUpdates.platform = "WordPress ✓";
      if (/custom/.test(q) && /develop/.test(q)) briefUpdates.platform = "Custom Dev ✓";
      if (/clothing|fashion|apparel/.test(q)) briefUpdates.project = "Clothing Store";
      if (/jewel|jewellery/.test(q)) briefUpdates.project = "Luxury Jewellery";
      if (/luxury|premium/.test(q)) briefUpdates.style = "Luxury / Premium";
      if (/\d+\s*products?/.test(q)) {
        const m = q.match(/(\d+)\s*products?/);
        if (m) briefUpdates.products = `~${m[1]} Products`;
      }
      if (Object.keys(briefUpdates).length) {
        setBrief((prev) => ({ ...prev, ...briefUpdates }));
      }

      // Match Studio Track if applicable
      let matchedTrackKey: string | undefined;
      if (/project|work|portfolio|flaneur|maison|dikhao/.test(q)) matchedTrackKey = "work";
      else if (/price|cost|charge|kitna|kharcha|budget/.test(q)) matchedTrackKey = "pricing";
      else if (/contact|email|whatsapp|hire|phone|reach/.test(q)) matchedTrackKey = "contact";
      else if (/about|vikash|who is|kaun/.test(q)) matchedTrackKey = "about";
      else if (/service|skills|tech/.test(q)) matchedTrackKey = "services";
      else if (/review|testimonial|client/.test(q)) matchedTrackKey = "reviews";

      speakResponseRef.current(data.reply, matchedTrackKey);
    } catch (err) {
      console.error("EVA Query error:", err);
      const fallback =
        "Main aapki baat samajh gayi. Aap screen par diye buttons se Vikash ke projects aur contact options dekh sakte hain.";
      setEvaText(fallback);
      speakResponseRef.current(fallback);
    }
  }, []);

  useEffect(() => {
    processQueryRef.current = processQuery;
  }, [processQuery]);

  // ── Open EVA Modal & Play Greeting ────────────────────────────────────────
  const openEva = useCallback(async () => {
    setIsOpen(true);
    setUserTranscript("");
    setActions([]);
    setBrief({});
    conversationStateRef.current = {};
    const greetingText =
      "Namaste! Main Eva hoon, Vikash Choudhary ki AI consultant. Aapka shubh naam kya hai?";
    setEvaText(greetingText);
    wakeRef.current?.abort();

    try {
      if (navigator.mediaDevices?.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }
    } catch {
      // ignore mic permission error here
    }

    // Play ElevenLabs Studio Namaste Greeting
    speakResponse(greetingText, "greeting");
  }, [speakResponse]);

  // ── Close EVA Modal ───────────────────────────────────────────────────────
  const closeEva = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    recRef.current?.abort();

    setIsOpen(false);
    setIsSpeaking(false);
    setIsListening(false);
    setUserTranscript("");
    setActions([]);
    setInputText("");
    setTimeout(startWakeListener, 500);
  }, []);

  // ── Background Wake Word Listener ("Hi Eva", "Eva") ───────────────────────
  const startWakeListener = useCallback(() => {
    const SRC = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SRC) return;
    try {
      wakeRef.current?.abort();
      const rec = new SRC();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-IN";
      rec.onresult = (e: SpeechRecognitionEvent) => {
        if (isOpenRef.current) return;
        let t = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          t += e.results[i][0].transcript;
        }
        if (/\b(hi|hey|hy|hello|suno|namaste)\s*eva\b|\beva\b/i.test(t)) {
          openEva();
        }
      };
      rec.onend = () => {
        if (!isOpenRef.current) {
          setTimeout(() => {
            if (!isOpenRef.current) {
              try {
                rec.start();
              } catch {
                /* */
              }
            }
          }, 400);
        }
      };
      rec.onerror = () => {
        setTimeout(() => {
          if (!isOpenRef.current) {
            try {
              rec.start();
            } catch {
              /* */
            }
          }
        }, 1000);
      };
      wakeRef.current = rec;
      rec.start();
    } catch {
      /* ignore */
    }
  }, [openEva]);

  useEffect(() => {
    const onGesture = () => {
      startWakeListener();
      window.removeEventListener("click", onGesture);
    };
    window.addEventListener("click", onGesture);
    startWakeListener();
    return () => {
      window.removeEventListener("click", onGesture);
      wakeRef.current?.abort();
      recRef.current?.abort();
    };
  }, [startWakeListener]);

  useEffect(() => {
    const onTrigger = () => {
      if (!isOpen) openEva();
    };
    window.addEventListener("trigger-voice-navigation", onTrigger);
    return () => window.removeEventListener("trigger-voice-navigation", onTrigger);
  }, [isOpen, openEva]);

  const hasBrief = Object.keys(brief).length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-auto select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-3xl"
          />

          {/* Main Layout */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-4 w-full max-w-4xl">
            {/* ── EVA Orb Card ─────────────────────────────────────────── */}
            <motion.div
              initial={{ scale: 0.72, opacity: 0, y: 44 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.72, opacity: 0, y: 32 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              className="relative w-full max-w-md rounded-[36px] p-6 sm:p-8 flex flex-col items-center text-center flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg,rgba(16,16,22,0.98) 0%,rgba(8,8,12,0.99) 100%)",
                border: "1.5px solid rgba(255,255,255,0.16)",
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.92),inset 0 1px 2px rgba(255,255,255,0.3),0 0 44px rgba(236,72,153,0.16)",
              }}
            >
              {/* Controls at Top */}
              <div className="absolute top-5 right-5 flex items-center gap-2">
                <motion.button
                  type="button"
                  onClick={() => {
                    const newMuted = !isMuted;
                    setIsMuted(newMuted);
                    if (newMuted) {
                      recRef.current?.abort();
                      setIsListening(false);
                    } else {
                      startActiveListening();
                    }
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={isMuted ? "Unmute Mic" : "Mute Mic"}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                    isMuted
                      ? "bg-red-500/20 border-red-500/40 text-red-400"
                      : "bg-white/10 hover:bg-white/20 border-white/20 text-white/80"
                  }`}
                >
                  {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={closeEva}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                >
                  <X size={17} />
                </motion.button>
              </div>

              {/* Status pill */}
              <div className="flex items-center gap-2 mb-5 flex-wrap justify-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSpeaking
                        ? "bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.9)]"
                        : isListening
                        ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.9)]"
                        : "bg-amber-400"
                    }`}
                  />
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-white/90">
                    {isSpeaking
                      ? "EVA IS SPEAKING"
                      : isMuted
                      ? "MIC MUTED (TYPE BELOW)"
                      : isListening
                      ? "EVA IS LISTENING..."
                      : "READY"}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-white/60">
                  <Globe2 size={11} className="text-cyan-400" />
                  HINGLISH / EN
                </div>
              </div>

              {/* Plasma Orb */}
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center mb-4">
                <motion.div
                  animate={{
                    scale: isSpeaking
                      ? [1.1, 1.45, 1.1]
                      : isListening
                      ? [1, 1.2, 1]
                      : [0.95, 1.05, 0.95],
                    opacity: isSpeaking ? [0.7, 1, 0.7] : [0.28, 0.55, 0.28],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: isSpeaking ? 2 : 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full blur-[45px] pointer-events-none"
                  style={{
                    background:
                      "conic-gradient(from 0deg,#38bdf8,#818cf8,#ec4899,#f43f5e,#fb923c,#06b6d4,#38bdf8)",
                  }}
                />
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: isSpeaking ? [1.05, 1.2, 1.05] : [0.96, 1.06, 0.96],
                  }}
                  transition={{
                    rotate: { duration: 3.5, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute inset-2 rounded-full blur-[18px] pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle,#f43f5e 15%,#a855f7 45%,#06b6d4 75%,transparent 95%)",
                  }}
                />
                <motion.div
                  animate={{
                    scale: isSpeaking ? [1.02, 1.14, 1.02] : [0.98, 1.04, 0.98],
                  }}
                  transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-28 h-28 sm:w-30 sm:h-30 rounded-full overflow-hidden flex items-center justify-center border border-white/55"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 35%,rgba(255,255,255,0.98) 0%,#38bdf8 25%,#a855f7 55%,#e11d48 85%,#0f172a 100%)",
                    boxShadow:
                      "0 0 60px rgba(236,72,153,0.75),inset 0 2px 4px rgba(255,255,255,0.9)",
                  }}
                >
                  <div className="absolute top-1 left-3 w-12 h-6 rounded-full bg-white/55 blur-[2px] -rotate-12 pointer-events-none" />
                  <div className="flex items-center justify-center gap-1 h-8">
                    {[38, 82, 100, 66, 90, 52, 76].map((h, i) => (
                      <motion.span
                        key={i}
                        animate={{
                          height:
                            isSpeaking || isListening
                              ? ["25%", `${h}%`, "35%"]
                              : ["15%", `${Math.max(25, h * 0.45)}%`, "18%"],
                        }}
                        transition={{
                          duration: 0.4 + (i % 3) * 0.14,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-1.5 rounded-full bg-white/95"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* EVA Response Bubble */}
              <motion.div
                key={evaText}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="p-4 rounded-2xl bg-white/[0.07] border border-white/13 backdrop-blur-md mb-3 w-full text-left"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles size={12} className="text-amber-400" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/60">
                    EVA • AI CONSULTANT
                  </span>
                  {isSpeaking && (
                    <span className="ml-auto flex items-center gap-1 text-[10px] font-mono text-cyan-400">
                      <Volume2 size={11} className="animate-pulse" /> Speaking
                    </span>
                  )}
                </div>
                <p className="text-sm sm:text-[15px] font-medium text-white leading-relaxed">
                  {evaText}
                </p>
              </motion.div>

              {/* Action Buttons */}
              {actions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap justify-center gap-2 mb-3 w-full"
                >
                  {actions.map((a) => (
                    <button
                      key={a.label}
                      type="button"
                      onClick={() => {
                        router.push(a.url);
                        closeEva();
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold text-xs shadow-[0_4px_18px_rgba(225,6,0,0.4)] hover:scale-105 active:scale-95 transition-transform"
                    >
                      {a.label} <ArrowUpRight size={13} />
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Quick Prompt Chips */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3 w-full">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => processQuery(prompt.replace(/^[^\w]+/, ""))}
                    className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/12 border border-white/10 text-[11px] text-white/75 hover:text-white transition-all hover:scale-105 active:scale-95"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* User Live Transcript */}
              {userTranscript && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-4 py-1.5 rounded-full bg-white/10 border border-white/18 text-white/85 text-xs mb-3 max-w-full truncate"
                >
                  &ldquo;{userTranscript}&rdquo;
                </motion.div>
              )}

              {/* Text Input + Send */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inputText.trim()) {
                    processQuery(inputText);
                    setInputText("");
                  }
                }}
                className="flex items-center gap-2 w-full mb-3"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type or speak to Eva..."
                  className="flex-1 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white text-xs placeholder-white/40 focus:outline-none focus:border-rose-500/60 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-600 to-red-600 disabled:opacity-40 flex items-center justify-center text-white text-xs transition-opacity flex-shrink-0"
                >
                  <Send size={13} />
                </button>
              </form>

              {/* End Call */}
              <button
                type="button"
                onClick={closeEva}
                className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-red-600/75 hover:bg-red-600 border border-red-500/40 text-white font-bold text-xs transition-colors active:scale-95"
              >
                <PhoneOff size={13} /> End Consultation
              </button>
            </motion.div>

            {/* ── Live Project Intelligence Panel ─────────────────────── */}
            <AnimatePresence>
              {hasBrief && (
                <motion.div
                  initial={{ opacity: 0, x: 30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 30, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className="w-full max-w-[220px] rounded-2xl p-4 flex-shrink-0"
                  style={{
                    background: "rgba(12,12,18,0.96)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.7)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Brain size={13} className="text-purple-400" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/60">
                      Project Brief
                    </span>
                  </div>
                  <div className="space-y-2">
                    {(
                      Object.entries(brief) as [keyof ProjectBrief, string][]
                    ).map(([key, value]) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start justify-between gap-2"
                      >
                        <span className="text-[10px] text-white/45 capitalize">
                          {key}
                        </span>
                        <span className="text-[10px] font-bold text-white/90 text-right">
                          {value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
