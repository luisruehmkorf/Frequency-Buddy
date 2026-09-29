// Vorsätze: Liste, Formular, Pausieren, Löschen. Kein Abhaken, kein Zählen.

import { de } from '../../texts/de';
import { h, fromHTML } from '../../core/ui/dom';
import { ICON } from '../../core/ui/icons';
import { emptyState, groupedList, pillButton } from '../../core/ui/components';
import { getAll, put, remove, newId } from '../../core/db';
import type { Intention } from '../../core/models';
import { buildIntention, showFewerHint, sortByCreated } from '../../logic/intentions';

let items: Intention[] = [];

interface Form {
  id?: string;
  what: string;
  why: string;
  whenWhere: string;
  error: boolean;
}
let form: Form | null = null;

export async function loadIntentions(): Promise<void> {
  items = sortByCreated(await getAll<Intention>('intentions').catch(() => []));
}

export const isEditingIntention = (): boolean => form !== null;

function save(i: Intention): void {
  void put('intentions', i).catch(() => {});
}

function toggleActive(i: Intention, rerender: () => void): void {
  const next = { ...i, isActive: !i.isActive };
  items = items.map((x) => (x.id === i.id ? next : x));
  save(next);
  rerender();
}

function del(i: Intention, rerender: () => void): void {
  items = items.filter((x) => x.id !== i.id);
  void remove('intentions', i.id).catch(() => {});
  rerender();
}

function row(i: Intention, rerender: () => void): HTMLElement {
  const t = de.vorsaetze;
  const link = (label: string, fn: () => void) => h('button', { class: 'link', onclick: fn }, label);
  return h(
    'div',
    { class: 'row' + (i.isActive ? '' : ' paused') },
    h('div', { class: 'title' }, i.what),
    i.why ? h('div', { class: 'meta' }, i.why) : null,
    i.whenWhere ? h('div', { class: 'meta' }, i.whenWhere) : null,
    h(
      'div',
      { class: 'acts' },
      link(i.isActive ? t.pause : t.resume, () => toggleActive(i, rerender)),
      link(t.edit, () => {
        form = { id: i.id, what: i.what, why: i.why ?? '', whenWhere: i.whenWhere ?? '', error: false };
        rerender();
      }),
      link(t.delete, () => del(i, rerender)),
    ),
  );
}

export function renderIntentionList(rerender: () => void): Node[] {
  const t = de.vorsaetze;
  const openForm = () => {
    form = { what: '', why: '', whenWhere: '', error: false };
    rerender();
  };
  const nodes: (Node | null)[] = [
    h('p', { class: 'sub' }, t.sub),
    showFewerHint(items) ? h('p', { class: 'small', style: 'margin:0 0 0.875rem' }, t.hint) : null,
    items.length ? groupedList(...items.map((i) => row(i, rerender))) : emptyState(t.empty),
    pillButton(t.newButton, openForm, items.length ? 'ghost' : ''),
  ];
  return nodes.filter((n): n is Node => n !== null);
}

function field(label: string, placeholder: string, value: string, onInput: (v: string) => void): Node[] {
  const input = h('input', { type: 'text', placeholder, 'aria-label': label, oninput: (e) => onInput((e.target as HTMLInputElement).value) });
  input.value = value;
  return [h('label', { class: 'lbl' }, label), input];
}

/** Formular zum Anlegen und Bearbeiten. Gibt die Knoten inklusive Zurück-Pfeil zurück. */
export function renderIntentionForm(rerender: () => void): Node[] {
  const f = form!;
  const t = de.vorsaetze;
  const back = h('button', {
    class: 'icon-btn',
    'aria-label': t.back,
    onclick: () => {
      form = null;
      rerender();
    },
  });
  back.append(fromHTML(ICON.back));

  const submit = () => {
    const base = items.find((i) => i.id === f.id);
    const intention = buildIntention(f, f.id ?? newId(), new Date(), base);
    if (!intention) {
      f.error = true;
      rerender();
      return;
    }
    items = sortByCreated(f.id ? items.map((i) => (i.id === intention.id ? intention : i)) : [...items, intention]);
    save(intention);
    form = null;
    rerender();
  };

  const nodes: (Node | null)[] = [
    h('div', { class: 'top' }, back, h('span')),
    h('h1', {}, f.id ? t.formEdit : t.formNew),
    ...field(t.what, t.whatPlaceholder, f.what, (v) => (f.what = v)),
    f.error ? h('p', { class: 'field-error', role: 'alert' }, t.whatRequired) : null,
    ...field(t.why, t.whyPlaceholder, f.why, (v) => (f.why = v)),
    ...field(t.whenWhere, t.whenPlaceholder, f.whenWhere, (v) => (f.whenWhere = v)),
    h('div', { style: 'margin-top:1.5rem' }, pillButton(t.save, submit)),
  ];
  return nodes.filter((n): n is Node => n !== null);
}
