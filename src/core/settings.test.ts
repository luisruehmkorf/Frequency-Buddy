import { describe, it, expect } from 'vitest';
import { themeAttribute, DEFAULT_SETTINGS } from './settings';

describe('Einstellungen', () => {
  it('Automatisch setzt kein data-theme, Hell und Dunkel schon', () => {
    expect(themeAttribute('auto')).toBeNull();
    expect(themeAttribute('light')).toBe('light');
    expect(themeAttribute('dark')).toBe('dark');
  });
  it('Standard ist Automatisch', () => {
    expect(DEFAULT_SETTINGS.theme).toBe('auto');
  });
});
