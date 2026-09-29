import { describe, it, expect } from 'vitest';
import { nextStep, STEPS, buildMorningEntry, buildEveningEntry } from './ritual';

const now = new Date('2026-05-04T06:30:00Z');

describe('Ablauf', () => {
  it('Morgen: Atemzug, Impuls, Abschluss', () => {
    expect(STEPS.morning).toEqual(['breath', 'impulse', 'done']);
    expect(nextStep('morning', 'breath')).toBe('impulse');
    expect(nextStep('morning', 'impulse')).toBe('done');
  });
  it('Abend: Atemzug, Gut, Loslassen, Abschluss', () => {
    expect(nextStep('evening', 'breath')).toBe('good');
    expect(nextStep('evening', 'good')).toBe('letgo');
    expect(nextStep('evening', 'letgo')).toBe('done');
  });
  it('nach dem Abschluss bleibt es beim Abschluss', () => {
    expect(nextStep('morning', 'done')).toBe('done');
    expect(nextStep('evening', 'done')).toBe('done');
  });
});

describe('Speichern nur bei Text', () => {
  it('leerer Morgen speichert nichts', () => {
    expect(buildMorningEntry({ promptKind: 'identity', text: '   ' }, 'a', now)).toBeNull();
  });
  it('Morgen mit Text, getrimmt, mit Impulsart', () => {
    const e = buildMorningEntry({ promptKind: 'gratitude', text: '  Ruhe  ' }, 'a', now);
    expect(e).toEqual({ id: 'a', date: now.toISOString(), promptKind: 'gratitude', text: 'Ruhe' });
  });
  it('leerer Abend speichert nichts', () => {
    expect(buildEveningEntry({ good: '', letGo: ' ', stressOrFear: '' }, 'b', now)).toBeNull();
  });
  it('Abend speichert nur ausgefüllte Felder', () => {
    const e = buildEveningEntry({ good: 'Spaziergang', letGo: '', stressOrFear: '' }, 'b', now);
    expect(e).toEqual({ id: 'b', date: now.toISOString(), good: 'Spaziergang' });
    expect(e).not.toHaveProperty('letGo');
  });
  it('Stress oder Angst allein genügt', () => {
    const e = buildEveningEntry({ good: '', letGo: '', stressOrFear: 'Eher Angst' }, 'b', now);
    expect(e?.stressOrFear).toBe('Eher Angst');
  });
});
