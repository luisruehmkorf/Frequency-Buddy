// Rückblick: Tagebuch als Leseliste (neueste zuerst), Einträge lesbar und bearbeitbar.
// Kein Zählen, keine Kalender-Heatmap, keine Markierung von Lücken.

import { de } from '../../texts/de';
import { h, fromHTML } from '../../core/ui/dom';
import { ICON } from '../../core/ui/icons';
import { emptyState, groupedList, pillButton } from '../../core/ui/components';
import { getAll, put } from '../../core/db';
import type { EveningEntry, MorningEntry } from '../../core/models';
import { openOverlay, closeOverlay, render, type ViewResult } from '../../core/router';

type Item = ({ type: 'morning' } & MorningEntry) | ({ type: 'evening' } & EveningEntry);

let items: Item[] = [];
let editing: Item | null = null;

async function load(): Promise<Item[]> {
  const [m, e] = await Promise.all([
    getAll<MorningEntry>('morningEntries').catch(() => []),
    getAll<EveningEntry>('eveningEntries').catch(() => []),
  ]);
  const all: Item[] = [
    ...m.map((x) => ({ type: 'morning' as const, ...x })),
    ...e.map((x) => ({ type: 'evening' as const, ...x })),
  ];
  return all.sort((a, b) => b.date.localeCompare(a.date));
}

export async function openRueckblick(): Promise<void> {
  items = await load();
  editing = null;
  openOverlay(renderRueckblick);
}

function backButton(onClick: () => void): HTMLElement {
  const btn = h('button', { class: 'icon-btn', 'aria-label': de.ritual.back, onclick: onClick });
  btn.append(fromHTML(ICON.back));
  return h('div', { class: 'top' }, btn, h('span'));
}

function when(item: Item): string {
  const d = new Date(item.date);
  const day = d.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' });
  const time = d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  return `${day}, ${time}, ${item.type === 'morning' ? de.rueckblick.morning : de.rueckblick.evening}`;
}

function body(item: Item): HTMLElement[] {
  const t = de.rueckblick;
  const out: HTMLElement[] = [];
  if (item.type === 'morning') {
    if (item.text) out.push(h('p', {}, item.text));
  } else {
    if (item.good) out.push(h('p', {}, item.good));
    if (item.letGo) out.push(h('p', { class: 'mut' }, `${t.letGo} ${item.letGo}`));
    if (item.stressOrFear) out.push(h('p', { class: 'mut' }, `${t.stress} ${item.stressOrFear}`));
  }
  if (out.length === 0) out.push(h('div', { class: 'small' }, t.noText));
  return out;
}

function renderList(): ViewResult {
  const t = de.rueckblick;
  const rows = items.map((item) =>
    h(
      'div',
      { class: 'entry' },
      h('div', { class: 'when' }, when(item)),
      ...body(item),
      h('button', { class: 'link', onclick: () => { editing = item; render(); } }, t.edit),
    ),
  );
  return {
    nodes: [
      backButton(closeOverlay),
      h('h1', {}, t.title),
      h('p', { class: 'sub' }, t.sub),
      rows.length ? groupedList(...rows) : emptyState(t.empty),
    ],
  };
}

function field(label: string, value: string, onInput: (v: string) => void, multiline = true): HTMLElement[] {
  const el = multiline
    ? h('textarea', { 'aria-label': label, style: 'min-height:5.5rem', oninput: (e) => onInput((e.target as HTMLTextAreaElement).value) })
    : h('input', { type: 'text', 'aria-label': label, oninput: (e) => onInput((e.target as HTMLInputElement).value) });
  el.value = value;
  return [h('label', { class: 'lbl' }, label), el];
}

function renderEdit(item: Item): ViewResult {
  const t = de.rueckblick;
  const draft = { ...item } as Item;
  const nodes: Node[] = [backButton(() => { editing = null; render(); }), h('h1', {}, t.editTitle), h('p', { class: 'small' }, when(item))];

  if (draft.type === 'morning') {
    nodes.push(...field(de.ritual.morning[draft.promptKind], draft.text ?? '', (v) => (draft.text = v)));
  } else {
    nodes.push(...field(de.ritual.evening.good, draft.good ?? '', (v) => (draft.good = v)));
    nodes.push(...field(de.ritual.evening.letGo, draft.letGo ?? '', (v) => (draft.letGo = v)));
    nodes.push(...field(de.ritual.evening.stress, draft.stressOrFear ?? '', (v) => (draft.stressOrFear = v), false));
  }

  nodes.push(h('div', { style: 'margin-top:1.5rem' }, pillButton(t.save, () => void saveEdit(item, draft))));
  return { nodes };
}

async function saveEdit(original: Item, draft: Item): Promise<void> {
  const { type, ...entry } = draft;
  // Leere Felder werden entfernt, damit nichts Leeres gespeichert wird.
  const cleaned = Object.fromEntries(
    Object.entries(entry).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]).filter(([, v]) => v !== ''),
  );
  await put(type === 'morning' ? 'morningEntries' : 'eveningEntries', cleaned).catch(() => {});
  items = items.map((i) => (i === original ? ({ type, ...cleaned } as Item) : i));
  editing = null;
  render();
}

function renderRueckblick(): ViewResult {
  return editing ? renderEdit(editing) : renderList();
}
