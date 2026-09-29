import { de } from '../../texts/de';
import { heroCard } from '../../core/ui/components';
import type { ViewResult } from '../../core/router';

function greeting(hour: number): string {
  if (hour < 11) return de.heute.greetingMorning;
  if (hour < 17) return de.heute.greetingDay;
  return de.heute.greetingEvening;
}

export function renderHeute(now: Date = new Date()): ViewResult {
  const date = now.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' });
  return { nodes: [heroCard({ date, greeting: greeting(now.getHours()), sub: de.heute.sub, settingsLabel: de.heute.settings })] };
}
