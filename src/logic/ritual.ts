// Ablauf und Speichern der Rituale. Rein und testbar. Nichts ist Pflicht:
// ein Durchlauf ohne Text speichert nichts (so entsteht auch keine Zählung von Tagen).

import type { EveningEntry, ImpulseKind, MorningEntry } from '../core/models';

export type RitualKind = 'morning' | 'evening';
export type Step = 'breath' | 'impulse' | 'intention' | 'good' | 'letgo' | 'done';

/** Schrittfolge. Der Vorsatz-Schritt erscheint nur, wenn es aktive Vorsätze gibt. */
export function stepsFor(kind: RitualKind, hasIntentions: boolean): Step[] {
  if (kind === 'evening') return ['breath', 'good', 'letgo', 'done'];
  return hasIntentions ? ['breath', 'impulse', 'intention', 'done'] : ['breath', 'impulse', 'done'];
}

/** Nächster Schritt. Nach dem letzten Schritt bleibt es bei 'done'. */
export function nextStep(steps: Step[], current: Step): Step {
  const i = steps.indexOf(current);
  return steps[Math.min(i + 1, steps.length - 1)];
}

export interface MorningDraft {
  promptKind: ImpulseKind;
  text: string;
  /** Leer = kein Vorsatz gewählt */
  intentionId: string;
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
  const intentionId = clean(draft.intentionId);
  if (!text && !intentionId) return null;
  const entry: MorningEntry = { id, date: now.toISOString(), promptKind: draft.promptKind };
  if (text) entry.text = text;
  if (intentionId) entry.intentionId = intentionId;
  return entry;
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
