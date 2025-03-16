import { create } from 'zustand';
import { UserSettings, defaultSettings } from './settings/types';
import { loadSettings, saveSettings } from './settings/service';

interface SettingsState {
  settings: UserSettings;
  isLoaded: boolean;
  setSettings: (settings: Partial<UserSettings>) => void;
  resetSettings: () => void;
  initSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: defaultSettings,
  isLoaded: false,
  
  setSettings: (newSettings) => {
    const updatedSettings = { ...get().settings, ...newSettings };
    set({ settings: updatedSettings });
    saveSettings(updatedSettings);
  },
  
  resetSettings: () => {
    set({ settings: defaultSettings });
    saveSettings(defaultSettings);
  },
  
  initSettings: async () => {
    const settings = await loadSettings();
    set({ settings, isLoaded: true });
  },
}));