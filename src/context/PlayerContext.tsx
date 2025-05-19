import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Song, Playlist } from '../types';
import { loadPreferences, savePreferences } from '../utils/localStorage';

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  currentPlaylist: Playlist | null;
  likedSongs: string[];
  recentlyPlayed: string[];
  audioRef: React.RefObject<HTMLAudioElement>;
  playSong: (song: Song, playlist?: Playlist) => void;
  pauseSong: () => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  toggleLike: (songId: string) => void;
  isLiked: (songId: string) => boolean;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<string[]>([]);
  
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // Load user preferences from localStorage
  useEffect(() => {
    const preferences = loadPreferences();
    setVolumeState(preferences.volume);
    setLikedSongs(preferences.likedSongs);
    setRecentlyPlayed(preferences.recentlyPlayed);
  }, []);

  // Save preferences when they change
  useEffect(() => {
    savePreferences({
      volume,
      likedSongs,
      recentlyPlayed,
    });
  }, [volume, likedSongs, recentlyPlayed]);

  // Update audio element when volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle time updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      nextSong();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong]);

  const playSong = (song: Song, playlist?: Playlist) => {
    setCurrentSong(song);
    if (playlist) {
      setCurrentPlaylist(playlist);
    }
    
    // Add to recently played
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(id => id !== song.id);
      return [song.id, ...filtered].slice(0, 20);
    });
    
    setIsPlaying(true);
    
    // Play the audio after a short delay to ensure the src is loaded
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      }
    }, 100);
  };

  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseSong();
    } else if (currentSong) {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(true);
    }
  };

  const nextSong = () => {
    if (!currentPlaylist || !currentSong) return;
    
    const currentIndex = currentPlaylist.songs.findIndex(song => song.id === currentSong.id);
    if (currentIndex === -1) return;
    
    const nextIndex = (currentIndex + 1) % currentPlaylist.songs.length;
    playSong(currentPlaylist.songs[nextIndex], currentPlaylist);
  };

  const prevSong = () => {
    if (!currentPlaylist || !currentSong) return;
    
    const currentIndex = currentPlaylist.songs.findIndex(song => song.id === currentSong.id);
    if (currentIndex === -1) return;
    
    const prevIndex = (currentIndex - 1 + currentPlaylist.songs.length) % currentPlaylist.songs.length;
    playSong(currentPlaylist.songs[prevIndex], currentPlaylist);
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const toggleLike = (songId: string) => {
    setLikedSongs(prev => {
      if (prev.includes(songId)) {
        return prev.filter(id => id !== songId);
      } else {
        return [...prev, songId];
      }
    });
  };

  const isLiked = (songId: string) => {
    return likedSongs.includes(songId);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        volume,
        currentTime,
        duration,
        currentPlaylist,
        likedSongs,
        recentlyPlayed,
        audioRef,
        playSong,
        pauseSong,
        togglePlay,
        nextSong,
        prevSong,
        setVolume,
        seekTo,
        toggleLike,
        isLiked,
      }}
    >
      {children}
      <audio ref={audioRef} src={currentSong?.audioSrc || ''} />
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
