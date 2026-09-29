// Wiederverwendbare Bausteine im Stil von docs/DESIGN.md.

import { h, fromHTML } from './dom';
import { ICON } from './icons';
import { heroWaves } from './waves';

/** Startseiten-Karte: Datum, Begrüßung, Untertitel, drei weiche Wellen. */
export function heroCard(opts: { date: string; greeting: string; sub: string; note?: string; onSettings?: () => void; settingsLabel?: string }): HTMLElement {
  const settings = h('button', { class: 'icon-btn', 'aria-label': opts.settingsLabel ?? 'Einstellungen', onclick: () => opts.onSettings?.() });
  settings.append(fromHTML(ICON.gear));
  return h(
    'section',
    { class: 'hero' },
    h('div', { class: 'top' }, h('span', { class: 'small' }, opts.date), settings),
    h('h1', {}, opts.greeting),
    h('p', { class: 'sub' }, opts.sub),
    opts.note ? h('p', { class: 'small', style: 'margin:0.5rem 0 0' }, opts.note) : null,
    heroWaves(),
  );
}

/** Frage-Screen: große Frage, optionaler Inhalt, Aktionen unten. */
export function questionScreen(question: string, content?: Node, actions?: Node): HTMLElement[] {
  return [h('h1', { class: 'q' }, question), content ?? null, actions ? h('div', { class: 'actions' }, actions) : null].filter(
    (n): n is HTMLElement => n instanceof HTMLElement,
  );
}

/** Pillen-Button. Ein Hauptbutton pro Bildschirm. */
export function pillButton(label: string, onClick: () => void, variant: '' | 'ghost' | 'sm' = ''): HTMLButtonElement {
  return h('button', { class: ('btn ' + variant).trim(), onclick: onClick }, label);
}

export function textButton(label: string, onClick: () => void): HTMLButtonElement {
  return h('button', { class: 'btn-text', onclick: onClick }, label);
}

/** Gruppierte Liste wie in iOS. */
export function groupedList(...rows: Node[]): HTMLElement {
  return h('div', { class: 'list' }, ...rows);
}

/** Zeile mit Titel, Untertitel und Pfeil. */
export function navRow(opts: { title: string; meta?: string; highlight?: boolean; onClick: () => void }): HTMLElement {
  const btn = h(
    'button',
    { class: 'nav-row' + (opts.highlight ? ' hl' : ''), onclick: opts.onClick },
    h('span', {}, h('h2', {}, opts.title), opts.meta ? h('span', { class: 'small' }, opts.meta) : null),
  );
  btn.append(fromHTML(ICON.chev));
  return btn;
}

/** Karte nur für Wichtiges (Zitat, Person). */
export function card(...children: Node[]): HTMLElement {
  return h('div', { class: 'card' }, ...children);
}

/** Segmentschalter wie in iOS. */
export function segmented(options: { id: string; label: string }[], selected: string, onSelect: (id: string) => void): HTMLElement {
  return h(
    'div',
    { class: 'seg', role: 'group' },
    ...options.map((o) =>
      h('button', { 'aria-pressed': String(o.id === selected), onclick: () => onSelect(o.id) }, o.label),
    ),
  );
}

/** Ruhiger leerer Zustand ohne Beispieldaten. */
export function emptyState(text: string): HTMLElement {
  return h('p', { class: 'empty' }, text);
}
