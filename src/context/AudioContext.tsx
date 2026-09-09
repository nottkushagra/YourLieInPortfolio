"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { YLIA_TRACKS, YLIATrack } from "@/lib/audioManager";

export interface AudioContextType {
  tracks: YLIATrack[];
  currentTrackIndex: number;
  currentTrack: YLIATrack;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number; // 0 - 100
  volume: number;
  togglePlay: () => void;
  playTrack: (index: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (seconds: number) => void;
  seekPercent: (percent: number) => void;
  setVolume: (vol: number) => void;
  formatTime: (seconds: number) => string;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [tracks] = useState<YLIATrack[]>(YLIA_TRACKS);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.85);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  // Helper to format seconds to mm:ss
  const formatTime = useCallback((secs: number) => {
    if (isNaN(secs) || secs < 0) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }, []);

  // Update audio source when track changes
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
    }

    const audio = audioRef.current;
    audio.src = currentTrack.src;
    audio.load();

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      // Auto-advance to next track
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      console.warn("Audio element error:", e);
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn("Playback interrupted or autoplay restricted:", err);
        setIsPlaying(false);
      });
    }

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
    };
  }, [currentTrackIndex, tracks]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => {
        console.warn("Playback restricted:", err);
      });
    }
  }, [isPlaying]);

  const playTrack = useCallback(
    (index: number) => {
      if (index === currentTrackIndex) {
        togglePlay();
        return;
      }
      setCurrentTrackIndex(index);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = tracks[index].src;
        audioRef.current.play().catch((err) => {
          console.warn("Playback restricted:", err);
        });
      }
    },
    [currentTrackIndex, togglePlay, tracks]
  );

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
    if (audioRef.current) {
      const nextIdx = (currentTrackIndex + 1) % tracks.length;
      audioRef.current.src = tracks[nextIdx].src;
      audioRef.current.play().catch(() => {});
    }
  }, [currentTrackIndex, tracks]);

  const prevTrack = useCallback(() => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevIdx);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = tracks[prevIdx].src;
      audioRef.current.play().catch(() => {});
    }
  }, [currentTrackIndex, tracks]);

  const seek = useCallback((secs: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = secs;
    setCurrentTime(secs);
  }, []);

  const seekPercent = useCallback(
    (percent: number) => {
      if (!audioRef.current || duration <= 0) return;
      const targetSecs = (percent / 100) * duration;
      seek(targetSecs);
    },
    [duration, seek]
  );

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <AudioContext.Provider
      value={{
        tracks,
        currentTrackIndex,
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        progress,
        volume,
        togglePlay,
        playTrack,
        nextTrack,
        prevTrack,
        seek,
        seekPercent,
        setVolume,
        formatTime,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
