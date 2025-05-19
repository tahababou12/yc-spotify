import { UserPreferences } from '../types';

const STORAGE_KEY = 'spotify-clone-preferences';

export const savePreferences = (preferences: UserPreferences): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
};

export const loadPreferences = (): UserPreferences => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    volume: 0.7,
    recentlyPlayed: [],
    likedSongs: [],
  };
};
