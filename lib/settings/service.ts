import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserSettings, UserSettingsSchema, defaultSettings } from './types';

const SETTINGS_KEY = 'user_settings';

export async function saveSettings(settings: UserSettings): Promise<void> {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

export async function loadSettings(): Promise<UserSettings> {
  try {
    const storedSettings = await AsyncStorage.getItem(SETTINGS_KEY);
    
    if (!storedSettings) {
      return defaultSettings;
    }
    
    const parsedSettings = JSON.parse(storedSettings);
    // Validar con Zod para asegurar que los datos son correctos
    const result = UserSettingsSchema.safeParse(parsedSettings);
    
    if (result.success) {
      return result.data;
    } else {
      console.warn('Invalid settings format, using defaults');
      return defaultSettings;
    }
  } catch (error) {
    console.error('Error loading settings:', error);
    return defaultSettings;
  }
}