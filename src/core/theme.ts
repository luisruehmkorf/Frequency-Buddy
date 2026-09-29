// Tageslicht-Phase für die Wellen im Dunkelmodus: Morgen 05 bis 16 Uhr, sonst Abend.
// Hell/Dunkel folgt prefers-color-scheme (siehe tokens.css); manuelle Wahl kommt mit den Einstellungen.

export type Phase = 'morning' | 'evening';

export function phaseForHour(hour: number): Phase {
  return hour >= 5 && hour < 16 ? 'morning' : 'evening';
}

export function applyPhase(date: Date = new Date()): void {
  document.documentElement.dataset.phase = phaseForHour(date.getHours());
}
