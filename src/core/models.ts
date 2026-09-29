// Datenmodell laut docs/SPEC.md. Kein Feld für "erledigt", "Streak" oder "Punkte".

export type ImpulseKind = 'identity' | 'gratitude';
export type ImpulseMode = 'alternate' | ImpulseKind;

export interface MorningEntry {
  id: string;
  /** ISO-Zeitstempel (UTC) */
  date: string;
  promptKind: ImpulseKind;
  text?: string;
  intentionId?: string;
}

export interface EveningEntry {
  id: string;
  date: string;
  good?: string;
  letGo?: string;
  stressOrFear?: string;
}
