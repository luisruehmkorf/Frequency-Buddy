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

export interface Intention {
  id: string;
  /** Was (Pflicht) */
  what: string;
  why?: string;
  whenWhere?: string;
  /** aktiv oder pausiert. Kein "erledigt", kein "gescheitert". */
  isActive: boolean;
  createdAt: string;
}

export interface Task {
  id: string;
  text: string;
  isDone: boolean;
  /** Kleinere Zahl steht weiter oben. Neue Aufgaben bekommen die kleinste Zahl. */
  sortOrder: number;
  createdAt: string;
}
