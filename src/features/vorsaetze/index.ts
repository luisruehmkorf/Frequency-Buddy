import { de } from '../../texts/de';
import { segmented } from '../../core/ui/components';
import { h } from '../../core/ui/dom';
import type { ViewResult } from '../../core/router';
import { loadIntentions, renderIntentionList, renderIntentionForm, isEditingIntention } from './intentions';
import { loadTasks, renderTaskList } from './tasks';

let tab: 'intentions' | 'tasks' = 'intentions';
let loaded = false;

export function renderVorsaetze(rerender: () => void): ViewResult {
  if (!loaded) {
    Promise.all([loadIntentions(), loadTasks()]).then(() => {
      loaded = true;
      rerender();
    });
  }

  if (loaded && tab === 'intentions' && isEditingIntention()) {
    return { nodes: renderIntentionForm(rerender) };
  }

  const seg = segmented(
    [
      { id: 'intentions', label: de.vorsaetze.segmentIntentions },
      { id: 'tasks', label: de.vorsaetze.segmentTasks },
    ],
    tab,
    (id) => {
      tab = id as typeof tab;
      rerender();
    },
  );
  const title = tab === 'intentions' ? de.vorsaetze.title : de.aufgaben.title;
  const body = !loaded ? [] : tab === 'intentions' ? renderIntentionList(rerender) : renderTaskList(rerender);
  return { nodes: [h('h1', {}, title), seg, ...body] };
}
