// Einfacher Router: fünf Tabs, jeder Tab rendert seine Ansicht in #screen.

import { fromHTML } from './ui/dom';

export type TabId = 'heute' | 'vorsaetze' | 'kueche' | 'connection' | 'inspiration';

export interface ViewResult {
  nodes: Node[];
  /** Fokusbühne (dunkel) statt heller Fläche. */
  immersive?: boolean;
  /** Tab-Leiste ausblenden (Rituale, Vollbild). */
  hideTabbar?: boolean;
  /** Inhalt als Spalte, Aktionen unten (Fragen, Atemlinie). */
  center?: boolean;
}

export interface Tab {
  id: TabId;
  label: string;
  icon: string;
  render: () => ViewResult;
}

export const TAB_ORDER: TabId[] = ['heute', 'vorsaetze', 'kueche', 'connection', 'inspiration'];

let tabs: Tab[] = [];
let current: TabId = 'heute';
let overlay: (() => ViewResult) | null = null;

export function registerTabs(list: Tab[]): void {
  tabs = list;
}

export function currentTab(): TabId {
  return current;
}

export function go(id: TabId): void {
  overlay = null;
  current = id;
  render();
}

/** Zeigt eine Ansicht über dem aktuellen Tab (z. B. Einstellungen). Die Tab-Leiste bleibt sichtbar. */
export function openOverlay(view: () => ViewResult): void {
  overlay = view;
  render();
}

export function closeOverlay(): void {
  overlay = null;
  render();
}

export function render(): void {
  const screen = document.getElementById('screen')!;
  const app = document.getElementById('app')!;
  const tab = tabs.find((t) => t.id === current)!;
  const view = overlay ? overlay() : tab.render();
  app.classList.toggle('immersive', !!view.immersive);
  screen.classList.toggle('center', !!view.center);
  screen.replaceChildren(...view.nodes);
  screen.scrollTop = 0;
  renderTabbar();
  document.getElementById('tabbar')!.hidden = !!view.hideTabbar;
}

function renderTabbar(): void {
  const bar = document.getElementById('tabbar')!;
  bar.replaceChildren(
    ...tabs.map((t) => {
      const btn = document.createElement('button');
      btn.className = 'tab';
      if (t.id === current) btn.setAttribute('aria-current', 'page');
      btn.append(fromHTML(t.icon), Object.assign(document.createElement('span'), { textContent: t.label }));
      btn.addEventListener('click', () => go(t.id));
      return btn;
    }),
  );
}
