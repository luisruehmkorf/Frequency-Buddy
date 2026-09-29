// App-Einstellungen (Singleton in IndexedDB). Wächst mit den Etappen.

import { get, put } from './db';

export type Theme = 'auto' | 'light' | 'dark';

export interface AppSettings {
  id: 'singleton';
  theme: Theme;
}

export const DEFAULT_SETTINGS: AppSettings = { id: 'singleton', theme: 'auto' };

/** Wert für data-theme am <html>. Bei 'auto' entfällt das Attribut, dann gilt prefers-color-scheme. */
export function themeAttribute(theme: Theme): 'light' | 'dark' | null {
  return theme === 'auto' ? null : theme;
}

export function applyTheme(theme: Theme): void {
  const attr = themeAttribute(theme);
  if (attr) document.documentElement.dataset.theme = attr;
  else delete document.documentElement.dataset.theme;
}

export async function loadSettings(): Promise<AppSettings> {
  try {
    const stored = await get<AppSettings>('settings', 'singleton');
    return { ...DEFAULT_SETTINGS, ...stored };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export async function saveSettings(patch: Partial<Omit<AppSettings, 'id'>>): Promise<AppSettings> {
  const next = { ...(await loadSettings()), ...patch };
  await put('settings', next);
  return next;
}
