"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect, useRef } from "react";

export type Track = {
  id: string;
  title: string;
  artist: string;
  src: string;
};

// Single background track
export const TRACK_PLAYLIST: Track[] = [
  {
    id: "dancin",
    title: "Dancin (KRONO Remix)",
    artist: "Aaron Smith",
    src: "/audio/dancin.mp3",
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
    const track = TRACK_PLAYLIST[0];
    globalAudio = new Audio(track.src);
    globalAudio.loop = true;  // Loop the single track
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
    </BackgroundAudioContext.Provider>
  );
}

export function useBackgroundAudio() {
  const ctx = useContext(BackgroundAudioContext);
  if (!ctx) throw new Error("useBackgroundAudio must be used within BackgroundAudioProvider");
  return ctx;
}
