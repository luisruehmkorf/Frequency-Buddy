import { describe, it, expect } from 'vitest';
import { dayOfYear, impulseKind, suggestedRitual } from './impulse';

describe('Impuls-Wechsel', () => {
  it('Tag des Jahres beginnt bei 1', () => {
    expect(dayOfYear(new Date(2026, 0, 1))).toBe(1);
    expect(dayOfYear(new Date(2026, 0, 2))).toBe(2);
    expect(dayOfYear(new Date(2026, 11, 31))).toBe(365);
    expect(dayOfYear(new Date(2028, 11, 31))).toBe(366);
  });

  it('Wechsel: gerader Tag Identität, ungerader Dankbarkeit', () => {
    expect(impulseKind('alternate', new Date(2026, 0, 2))).toBe('identity');
    expect(impulseKind('alternate', new Date(2026, 0, 3))).toBe('gratitude');
    expect(impulseKind('alternate', new Date(2026, 0, 1))).toBe('gratitude');
  });

  it('Wechsel hängt nicht von der Uhrzeit ab', () => {
    expect(impulseKind('alternate', new Date(2026, 0, 2, 0, 5))).toBe('identity');
    expect(impulseKind('alternate', new Date(2026, 0, 2, 23, 59))).toBe('identity');
  });

  it('Zeitumstellung verschiebt den Tag nicht', () => {
    // 2026: Sommerzeit beginnt am 29. März (Tag 88), endet am 25. Oktober (Tag 298)
    expect(dayOfYear(new Date(2026, 2, 29, 12))).toBe(88);
    expect(dayOfYear(new Date(2026, 2, 30, 0, 30))).toBe(89);
    expect(dayOfYear(new Date(2026, 9, 25, 12))).toBe(298);
    expect(dayOfYear(new Date(2026, 9, 26, 0, 30))).toBe(299);
  });

  it('Modus Identität und Dankbarkeit gelten immer', () => {
    for (const day of [1, 2, 3, 4]) {
      expect(impulseKind('identity', new Date(2026, 0, day))).toBe('identity');
      expect(impulseKind('gratitude', new Date(2026, 0, day))).toBe('gratitude');
    }
  });
});

describe('Empfohlenes Ritual', () => {
  it('Morgen bis 15:59, ab 16 Uhr Abend', () => {
    expect(suggestedRitual(0)).toBe('morning');
    expect(suggestedRitual(15)).toBe('morning');
    expect(suggestedRitual(16)).toBe('evening');
    expect(suggestedRitual(23)).toBe('evening');
  });
  it('Wechselstunde ist einstellbar', () => {
    expect(suggestedRitual(17, 18)).toBe('morning');
    expect(suggestedRitual(18, 18)).toBe('evening');
  });
});
