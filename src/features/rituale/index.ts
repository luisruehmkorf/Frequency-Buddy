// Morgen- und Abend-Ritual. Jeder Schritt ist überspringbar, nichts ist Pflicht.

import { de } from '../../texts/de';
import { h, fromHTML } from '../../core/ui/dom';
import { ICON } from '../../core/ui/icons';
import { breathLine, doneMoment } from '../../core/ui/waves';
import { pillButton, textButton } from '../../core/ui/components';
import { put, newId } from '../../core/db';
import { loadSettings } from '../../core/settings';
import { impulseKind } from '../../logic/impulse';
import {
  nextStep,
  buildMorningEntry,
  buildEveningEntry,
  type RitualKind,
  type Step,
  type MorningDraft,
  type EveningDraft,
} from '../../logic/ritual';
import { openOverlay, closeOverlay, render, type ViewResult } from '../../core/router';

interface Flow {
  kind: RitualKind;
  step: Step;
  morning: MorningDraft;
  evening: EveningDraft;
}

const BREATH_SECONDS = 4;
const DONE_MS = 3400;

let flow: Flow | null = null;
let doneTimer = 0;

export async function startRitual(kind: RitualKind): Promise<void> {
  const settings = await loadSettings();
  flow = {
    kind,
    step: 'breath',
    morning: { promptKind: impulseKind(settings.impulseMode, new Date()), text: '' },
    evening: { good: '', letGo: '', stressOrFear: '' },
  };
  openOverlay(renderRitual);
}

function exit(): void {
  clearTimeout(doneTimer);
  flow = null;
  closeOverlay();
}

function save(f: Flow): void {
  const now = new Date();
  if (f.kind === 'morning') {
    const entry = buildMorningEntry(f.morning, newId(), now);
    if (entry) void put('morningEntries', entry).catch(() => {});
  } else {
    const entry = buildEveningEntry(f.evening, newId(), now);
    if (entry) void put('eveningEntries', entry).catch(() => {});
  }
}

/** Weiter zum nächsten Schritt. Bei "Überspringen" wird die Eingabe des aktuellen Schritts verworfen. */
function advance(keep: boolean): void {
  const f = flow;
  if (!f) return;
  if (!keep) {
    if (f.step === 'impulse') f.morning.text = '';
    if (f.step === 'good') f.evening.good = '';
    if (f.step === 'letgo') {
      f.evening.letGo = '';
      f.evening.stressOrFear = '';
    }
  }
  f.step = nextStep(f.kind, f.step);
  if (f.step === 'done') {
    save(f);
    doneTimer = window.setTimeout(exit, DONE_MS);
  }
  render();
}

function closeButton(): HTMLElement {
  const btn = h('button', { class: 'icon-btn', 'aria-label': de.ritual.close, onclick: exit });
  btn.append(fromHTML(ICON.close));
  return h('div', { class: 'top' }, btn, h('span'));
}

function actions(primary: string, skip: boolean): HTMLElement {
  return h(
    'div',
    { class: 'actions' },
    pillButton(primary, () => advance(true)),
    skip ? textButton(de.ritual.skip, () => advance(false)) : null,
  );
}

function focusLater(el: HTMLElement): void {
  // Auf dem iPhone öffnet sich die Tastatur nur nach Tippen. Am Computer direkt fokussieren.
  if (!('ontouchstart' in window)) requestAnimationFrame(() => el.focus());
}

function textarea(value: string, placeholder: string, label: string, onInput: (v: string) => void): HTMLTextAreaElement {
  const ta = h('textarea', {
    placeholder,
    'aria-label': label,
    oninput: (e) => onInput((e.target as HTMLTextAreaElement).value),
  });
  ta.value = value;
  focusLater(ta);
  return ta;
}

function renderRitual(): ViewResult {
  const f = flow!;
  const base = { immersive: true, hideTabbar: true, center: true };

  if (f.step === 'breath') {
    const breath = breathLine();
    breath.start(BREATH_SECONDS);
    return { ...base, nodes: [closeButton(), breath.element, actions(de.ritual.next, true)] };
  }

  if (f.step === 'done') {
    const text = f.kind === 'morning' ? de.ritual.morning.done : de.ritual.evening.done;
    return { ...base, nodes: [closeButton(), doneMoment(text), h('div', { class: 'actions' }, textButton(de.ritual.back, exit))] };
  }

  if (f.kind === 'morning') {
    const q = de.ritual.morning[f.morning.promptKind];
    return {
      ...base,
      nodes: [
        closeButton(),
        h('h1', { class: 'q' }, q),
        textarea(f.morning.text, de.ritual.morning.placeholder, q, (v) => (f.morning.text = v)),
        actions(de.ritual.next, true),
      ],
    };
  }

  if (f.step === 'good') {
    const q = de.ritual.evening.good;
    return {
      ...base,
      nodes: [
        closeButton(),
        h('h1', { class: 'q' }, q),
        textarea(f.evening.good, de.ritual.evening.goodPlaceholder, q, (v) => (f.evening.good = v)),
        actions(de.ritual.next, true),
      ],
    };
  }

  // Abend, "Was darf gehen?" mit eingeklappter Extra-Option
  const q = de.ritual.evening.letGo;
  const stress = h('input', {
    type: 'text',
    placeholder: de.ritual.evening.optional,
    'aria-label': de.ritual.evening.stress,
    value: f.evening.stressOrFear,
    oninput: (e) => (f.evening.stressOrFear = (e.target as HTMLInputElement).value),
  });
  return {
    ...base,
    nodes: [
      closeButton(),
      h('h1', { class: 'q' }, q),
      textarea(f.evening.letGo, de.ritual.evening.letGoPlaceholder, q, (v) => (f.evening.letGo = v)),
      h(
        'details',
        { open: f.evening.stressOrFear !== '' },
        h('summary', {}, de.ritual.evening.stress),
        h('p', { class: 'small', style: 'margin:0.5rem 0 0.625rem' }, de.ritual.evening.stressHelp),
        stress,
      ),
      actions(de.ritual.finish, true),
    ],
  };
}
