import { de } from '../../texts/de';
import { emptyState } from '../../core/ui/components';
import { h } from '../../core/ui/dom';
import type { ViewResult } from '../../core/router';

export function renderConnection(): ViewResult {
  return { nodes: [h('h1', {}, de.tabs.connection), emptyState(de.connection.empty)] };
}
