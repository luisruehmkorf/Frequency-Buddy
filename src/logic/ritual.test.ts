import { describe, it, expect } from 'vitest';
import { nextStep, stepsFor, buildMorningEntry, buildEveningEntry } from './ritual';

const now = new Date('2026-05-04T06:30:00Z');

describe('Ablauf', () => {
  it('Morgen ohne Vorsätze: Atemzug, Impuls, Abschluss', () => {
    const steps = stepsFor('morning', false);
    expect(steps).toEqual(['breath', 'impulse', 'done']);
    expect(nextStep(steps, 'breath')).toBe('impulse');
    expect(nextStep(steps, 'impulse')).toBe('done');
  });
  it('Morgen mit aktiven Vorsätzen: zusätzlich der Vorsatz-Schritt', () => {
    const steps = stepsFor('morning', true);
    expect(steps).toEqual(['breath', 'impulse', 'intention', 'done']);
    expect(nextStep(steps, 'impulse')).toBe('intention');
    expect(nextStep(steps, 'intention')).toBe('done');
  });
  it('Abend: Atemzug, Gut, Loslassen, Abschluss, unabhängig von Vorsätzen', () => {
    expect(stepsFor('evening', true)).toEqual(stepsFor('evening', false));
    const steps = stepsFor('evening', false);
    expect(nextStep(steps, 'breath')).toBe('good');
    expect(nextStep(steps, 'good')).toBe('letgo');
    expect(nextStep(steps, 'letgo')).toBe('done');
  });
  it('nach dem Abschluss bleibt es beim Abschluss', () => {
    expect(nextStep(stepsFor('morning', true), 'done')).toBe('done');
  });
});

describe('Speichern nur bei Text', () => {
  it('leerer Morgen speichert nichts', () => {
    expect(buildMorningEntry({ promptKind: 'identity', text: '   ', intentionId: '' }, 'a', now)).toBeNull();
  });
  it('Morgen mit Text, getrimmt, mit Impulsart', () => {
    const e = buildMorningEntry({ promptKind: 'gratitude', text: '  Ruhe  ', intentionId: '' }, 'a', now);
    expect(e).toEqual({ id: 'a', date: now.toISOString(), promptKind: 'gratitude', text: 'Ruhe' });
  });
  it('Vorsatz allein genügt zum Speichern', () => {
    const e = buildMorningEntry({ promptKind: 'identity', text: '', intentionId: 'i1' }, 'a', now);
    expect(e).toEqual({ id: 'a', date: now.toISOString(), promptKind: 'identity', intentionId: 'i1' });
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
