// Ablauf und Speichern der Rituale. Rein und testbar. Nichts ist Pflicht:
// ein Durchlauf ohne Text speichert nichts (so entsteht auch keine Zählung von Tagen).

import type { EveningEntry, ImpulseKind, MorningEntry } from '../core/models';

export type RitualKind = 'morning' | 'evening';
export type Step = 'breath' | 'impulse' | 'good' | 'letgo' | 'done';

export const STEPS: Record<RitualKind, Step[]> = {
  morning: ['breath', 'impulse', 'done'],
  evening: ['breath', 'good', 'letgo', 'done'],
};

/** Nächster Schritt. Nach dem letzten Schritt bleibt es bei 'done'. */
export function nextStep(kind: RitualKind, current: Step): Step {
  const steps = STEPS[kind];
  const i = steps.indexOf(current);
  return steps[Math.min(i + 1, steps.length - 1)];
}

export interface MorningDraft {
  promptKind: ImpulseKind;
  text: string;
}

export interface EveningDraft {
  good: string;
  letGo: string;
  stressOrFear: string;
}

const clean = (s: string): string | undefined => {
  const t = s.trim();
  return t === '' ? undefined : t;
};

export function buildMorningEntry(draft: MorningDraft, id: string, now: Date): MorningEntry | null {
  const text = clean(draft.text);
  if (!text) return null;
  return { id, date: now.toISOString(), promptKind: draft.promptKind, text };
}

export function buildEveningEntry(draft: EveningDraft, id: string, now: Date): EveningEntry | null {
  const good = clean(draft.good);
  const letGo = clean(draft.letGo);
  const stressOrFear = clean(draft.stressOrFear);
  if (!good && !letGo && !stressOrFear) return null;
  const entry: EveningEntry = { id, date: now.toISOString() };
  if (good) entry.good = good;
  if (letGo) entry.letGo = letGo;
  if (stressOrFear) entry.stressOrFear = stressOrFear;
  return entry;
}
