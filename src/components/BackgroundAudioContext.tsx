"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect, useRef } from "react";

export type Track = {
  id: string;
  title: string;
  artist: string;
  src: string;
};

// Playlist of background tracks — dynamically picked on each visit
export const TRACK_PLAYLIST: Track[] = [
  {
    id: "dancin",
    title: "Dancin (KRONO Remix)",
    artist: "Aaron Smith",
    src: "/audio/dancin.mp3",
  },
  {
    id: "happy-nation",
    title: "Happy Nation",
    artist: "Ace of Base",
    src: "/audio/hero_track.mp3",
  },
];

type BackgroundAudioContextValue = {
  playing: boolean;
  toggle: () => void;
  trackTitle: string;
  currentTrack: Track;
  nextTrack: () => void;
};

const BackgroundAudioContext = createContext<BackgroundAudioContextValue | null>(null);

// Module-level persistent singleton so audio NEVER pauses or resets on route changes
let globalAudio: HTMLAudioElement | null = null;
let currentTrackIndex = 0;

function getRandomTrackIndex(): number {
  if (typeof window === "undefined" || TRACK_PLAYLIST.length <= 1) return 0;
  // Get last played track index from sessionStorage to ensure fresh track on each visit
  const lastPlayed = sessionStorage.getItem("last_audio_track_id");
  const availableIndices = TRACK_PLAYLIST.map((_, i) => i).filter(
    (i) => TRACK_PLAYLIST[i].id !== lastPlayed
  );
  const picked = availableIndices.length > 0
    ? availableIndices[Math.floor(Math.random() * availableIndices.length)]
    : Math.floor(Math.random() * TRACK_PLAYLIST.length);
  
  sessionStorage.setItem("last_audio_track_id", TRACK_PLAYLIST[picked].id);
  return picked;
}

function getOrCreateGlobalAudio(): HTMLAudioElement {
  if (!globalAudio && typeof window !== "undefined") {
    currentTrackIndex = getRandomTrackIndex();
    const track = TRACK_PLAYLIST[currentTrackIndex] || TRACK_PLAYLIST[0];
    globalAudio = new Audio(track.src);
    globalAudio.loop = false; // We use onEnded to cycle next track
    globalAudio.volume = 0.65;
    globalAudio.preload = "auto";
  }
  return globalAudio!;
}

export function BackgroundAudioProvider({ children }: { children: ReactNode }) {
  const [trackIndex, setTrackIndex] = useState(() => currentTrackIndex);
  const [playing, setPlaying] = useState(() => {
    if (typeof window !== "undefined" && globalAudio) {
      return !globalAudio.paused;
    }
    return false;
  });

  const currentTrack = TRACK_PLAYLIST[trackIndex] || TRACK_PLAYLIST[0];
  const trackTitle = `${currentTrack.artist} — ${currentTrack.title}`;

  const playTrackAtIndex = useCallback((newIndex: number) => {
    const audio = getOrCreateGlobalAudio();
    if (!audio) return;

    const normalizedIndex = (newIndex + TRACK_PLAYLIST.length) % TRACK_PLAYLIST.length;
    currentTrackIndex = normalizedIndex;
    setTrackIndex(normalizedIndex);

    const nextSong = TRACK_PLAYLIST[normalizedIndex];
    audio.src = nextSong.src;
    audio.currentTime = 0;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch((err) => console.warn("Auto-play next track prevented:", err));
  }, []);

  const nextTrack = useCallback(() => {
    playTrackAtIndex(currentTrackIndex + 1);
  }, [playTrackAtIndex]);

  useEffect(() => {
    const audio = getOrCreateGlobalAudio();
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      // Automatically transition to next song when current finishes
      playTrackAtIndex(currentTrackIndex + 1);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    // Sync initial state
    setPlaying(!audio.paused);
    setTrackIndex(currentTrackIndex);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [playTrackAtIndex]);

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
    <BackgroundAudioContext.Provider value={{ playing, toggle, trackTitle, currentTrack, nextTrack }}>
      {children}
      {/* Global persistent floating sound indicator (visible when audio is playing or on other pages) */}
      <GlobalPersistentAudioWidget />
    </BackgroundAudioContext.Provider>
  );
}

function GlobalPersistentAudioWidget() {
  const { playing, toggle, trackTitle, nextTrack } = useBackgroundAudio();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  if (!show || !playing) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[999] animate-fade-in pointer-events-auto flex items-center gap-1.5 bg-[#0a0a0a]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-2xl">
      <button
        onClick={toggle}
        data-cursor-hover
        className="flex items-center gap-2 text-white text-xs font-mono hover:text-white/80 transition-colors cursor-pointer"
        title="Click to Pause Background Music"
      >
        {/* Animated Dancing Equalizer Bars */}
        <div className="flex items-end gap-0.5 h-3.5 w-3.5 justify-center">
          <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_infinite_ease-in-out] h-full" />
          <span className="w-0.5 bg-white rounded-full animate-[bounce_0.8s_infinite_0.2s_ease-in-out] h-full" />
          <span className="w-0.5 bg-white rounded-full animate-[bounce_0.5s_infinite_0.4s_ease-in-out] h-full" />
        </div>
        <span className="text-[11px] font-semibold tracking-wide max-w-[180px] sm:max-w-[240px] truncate">
          {trackTitle}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
      </button>

      {/* Skip / Next Song Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextTrack();
        }}
        data-cursor-hover
        className="ml-1 p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        title="Next Song ⏭️"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M5.5 3.5v17l10-8.5-10-8.5zm11 0v17h2v-17h-2z" />
        </svg>
      </button>
    </div>
  );
}

export function useBackgroundAudio() {
  const ctx = useContext(BackgroundAudioContext);
  if (!ctx) throw new Error("useBackgroundAudio must be used within BackgroundAudioProvider");
  return ctx;
}
