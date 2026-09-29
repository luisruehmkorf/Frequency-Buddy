import { de } from '../../texts/de';
import { emptyState } from '../../core/ui/components';
import { h } from '../../core/ui/dom';
import type { ViewResult } from '../../core/router';

// Fokusbühne: dunkle Fläche. Bedarfsfrage und Atempause folgen in Etappe 3.
export function renderInspiration(): ViewResult {
  return { immersive: true, nodes: [h('h1', {}, de.tabs.inspiration), emptyState(de.inspiration.empty)] };
}
