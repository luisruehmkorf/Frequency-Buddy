// Vorsätze: Was, nicht wie oft. Kein Abhaken, kein Zählen. Rein und testbar.

import type { Intention } from '../core/models';

/** Empfohlene Obergrenze aktiver Vorsätze. Keine harte Sperre. */
export const INTENTION_SOFT_LIMIT = 5;

export interface IntentionInput {
  what: string;
  why: string;
  whenWhere: string;
}

const clean = (s: string): string | undefined => {
  const t = s.trim();
  return t === '' ? undefined : t;
};

/** Baut einen Vorsatz aus dem Formular. Ohne "Was" entsteht keiner. */
export function buildIntention(input: IntentionInput, id: string, now: Date, base?: Intention): Intention | null {
  const what = clean(input.what);
  if (!what) return null;
  const intention: Intention = {
    id,
    what,
    isActive: base?.isActive ?? true,
    createdAt: base?.createdAt ?? now.toISOString(),
  };
  const why = clean(input.why);
  const whenWhere = clean(input.whenWhere);
  if (why) intention.why = why;
  if (whenWhere) intention.whenWhere = whenWhere;
  return intention;
}

export const activeIntentions = (list: Intention[]): Intention[] => list.filter((i) => i.isActive);

/** Sanfter Hinweis ab mehr als 5 aktiven Vorsätzen. */
export const showFewerHint = (list: Intention[]): boolean => activeIntentions(list).length > INTENTION_SOFT_LIMIT;

export const sortByCreated = (list: Intention[]): Intention[] =>
  [...list].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
