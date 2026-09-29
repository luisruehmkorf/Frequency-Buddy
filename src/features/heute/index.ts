import { de } from '../../texts/de';
import { heroCard, groupedList, navRow } from '../../core/ui/components';
import { suggestedRitual } from '../../logic/impulse';
import type { RitualKind } from '../../logic/ritual';
import type { ViewResult } from '../../core/router';

function greeting(hour: number): string {
  if (hour < 11) return de.heute.greetingMorning;
  if (hour < 17) return de.heute.greetingDay;
  return de.heute.greetingEvening;
}

export interface HeuteActions {
  onSettings: () => void;
  onStart: (kind: RitualKind) => void;
  onRueckblick: () => void;
}

export function renderHeute(actions: HeuteActions, now: Date = new Date()): ViewResult {
  const date = now.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' });
  const suggested = suggestedRitual(now.getHours());
  const ritual = (kind: RitualKind) =>
    navRow({
      title: de.heute[kind].title,
      meta: de.heute[kind].meta,
      highlight: suggested === kind,
      onClick: () => actions.onStart(kind),
    });
  // Das passende Ritual steht oben
  const rituals = suggested === 'evening' ? [ritual('evening'), ritual('morning')] : [ritual('morning'), ritual('evening')];

  return {
    nodes: [
      heroCard({ date, greeting: greeting(now.getHours()), sub: de.heute.sub, onSettings: actions.onSettings, settingsLabel: de.heute.settings }),
      groupedList(...rituals, navRow({ title: de.heute.rueckblick.title, meta: de.heute.rueckblick.meta, onClick: actions.onRueckblick })),
    ],
  };
}
