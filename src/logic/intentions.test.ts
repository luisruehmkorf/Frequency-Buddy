import { describe, it, expect } from 'vitest';
import { buildIntention, showFewerHint, activeIntentions, INTENTION_SOFT_LIMIT } from './intentions';
import type { Intention } from '../core/models';

const now = new Date('2026-05-04T06:30:00Z');
const make = (n: number, active = true): Intention[] =>
  Array.from({ length: n }, (_, i) => ({ id: String(i), what: 'x' + i, isActive: active, createdAt: now.toISOString() }));

describe('Vorsätze', () => {
  it('ohne Was entsteht kein Vorsatz', () => {
    expect(buildIntention({ what: '  ', why: 'a', whenWhere: 'b' }, 'a', now)).toBeNull();
  });
  it('nur Was ist genug, leere Felder werden nicht gespeichert', () => {
    const i = buildIntention({ what: ' Gym ', why: '', whenWhere: ' ' }, 'a', now)!;
    expect(i).toEqual({ id: 'a', what: 'Gym', isActive: true, createdAt: now.toISOString() });
    expect(i).not.toHaveProperty('why');
  });
  it('Bearbeiten behält Status und Erstelldatum', () => {
    const base: Intention = { id: 'a', what: 'alt', isActive: false, createdAt: '2026-01-01T00:00:00.000Z' };
    const i = buildIntention({ what: 'neu', why: 'weil', whenWhere: '' }, 'a', now, base)!;
    expect(i.isActive).toBe(false);
    expect(i.createdAt).toBe(base.createdAt);
    expect(i.why).toBe('weil');
  });
  it('Hinweis erst ab mehr als 5 aktiven, pausierte zählen nicht', () => {
    expect(showFewerHint(make(INTENTION_SOFT_LIMIT))).toBe(false);
    expect(showFewerHint(make(INTENTION_SOFT_LIMIT + 1))).toBe(true);
    expect(showFewerHint([...make(5), ...make(4, false)])).toBe(false);
    expect(activeIntentions([...make(2), ...make(3, false)])).toHaveLength(2);
  });
  it('kein Feld für erledigt, Streak oder Punkte', () => {
    const keys = Object.keys(buildIntention({ what: 'a', why: 'b', whenWhere: 'c' }, 'a', now)!);
    expect(keys.sort()).toEqual(['createdAt', 'id', 'isActive', 'what', 'whenWhere', 'why']);
  });
});
