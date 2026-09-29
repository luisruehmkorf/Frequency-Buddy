import { de } from '../../texts/de';
import { segmented, emptyState } from '../../core/ui/components';
import { h } from '../../core/ui/dom';
import type { ViewResult } from '../../core/router';

let tab = 'intentions';

export function renderVorsaetze(rerender: () => void): ViewResult {
  const seg = segmented(
    [
      { id: 'intentions', label: de.vorsaetze.segmentIntentions },
      { id: 'tasks', label: de.vorsaetze.segmentTasks },
    ],
    tab,
    (id) => {
      tab = id;
      rerender();
    },
  );
  const empty = tab === 'intentions' ? de.vorsaetze.empty : de.vorsaetze.tasksEmpty;
  return { nodes: [h('h1', {}, de.tabs.vorsaetze), seg, emptyState(empty)] };
}
