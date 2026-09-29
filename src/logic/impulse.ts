// Impuls-Wechsel im Morgen-Ritual und empfohlenes Ritual nach Tageszeit. Rein und testbar.

import type { ImpulseKind, ImpulseMode } from '../core/models';

/** Tag des Jahres in lokaler Zeit (1. Januar = 1), unabhängig von Zeitumstellung. */
export function dayOfYear(date: Date): number {
  const DAY = 86_400_000;
  const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const newYear = Date.UTC(date.getFullYear(), 0, 0);
  return Math.round((today - newYear) / DAY);
}

/**
 * Wechsel: gerader Tag des Jahres = Identität, ungerader = Dankbarkeit.
 * Die Modi "Identität" und "Dankbarkeit" gelten immer.
 */
export function impulseKind(mode: ImpulseMode, date: Date): ImpulseKind {
  if (mode === 'identity' || mode === 'gratitude') return mode;
  return dayOfYear(date) % 2 === 0 ? 'identity' : 'gratitude';
}

export const DEFAULT_SWITCH_HOUR = 16;

/** Welches Ritual auf Heute hervorgehoben wird: ab der Wechselstunde der Abend. */
export function suggestedRitual(hour: number, switchHour: number = DEFAULT_SWITCH_HOUR): 'morning' | 'evening' {
  return hour >= switchHour ? 'evening' : 'morning';
}
