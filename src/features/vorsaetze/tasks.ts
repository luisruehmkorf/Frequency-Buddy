// Aufgaben: eine einzige Liste. Neue oben, abhaken, bearbeiten, ziehen, wischen zum Entfernen.
// Keine Fristen, keine Zähler, keine Fortschrittsanzeige.

import { de } from '../../texts/de';
import { h, fromHTML } from '../../core/ui/dom';
import { ICON } from '../../core/ui/icons';
import { emptyState, groupedList, pillButton } from '../../core/ui/components';
import { getAll, put, remove, newId } from '../../core/db';
import type { Task } from '../../core/models';
import { newTask, toggleTask, moveTask, editTaskText, openTasks, doneTasks, showShortListHint } from '../../logic/tasks';

let tasks: Task[] = [];
let showDone = false;
let editingId: string | null = null;
let openSwipeId: string | null = null;

const SWIPE_WIDTH = 88; // px, entspricht 5,5 rem

export async function loadTasks(): Promise<void> {
  tasks = await getAll<Task>('tasks').catch(() => []);
}

const persist = (t: Task) => void put('tasks', t).catch(() => {});
const replace = (t: Task) => (tasks = tasks.map((x) => (x.id === t.id ? t : x)));

function toggle(task: Task, rerender: () => void): void {
  const next = toggleTask(task, tasks);
  replace(next);
  persist(next);
  rerender();
}

function removeTask(task: Task, rerender: () => void): void {
  tasks = tasks.filter((t) => t.id !== task.id);
  void remove('tasks', task.id).catch(() => {});
  rerender();
}

function reorder(from: number, to: number, rerender: () => void): void {
  const open = openTasks(tasks);
  const moved = moveTask(open, from, to);
  if (moved === open) return;
  for (const t of moved) {
    replace(t);
    persist(t);
  }
  rerender();
}

/* ---------- Ziehen (Griff) ---------- */

function attachDrag(handle: HTMLElement, wrap: HTMLElement, list: () => HTMLElement[], index: number, rerender: () => void): void {
  handle.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') { e.preventDefault(); reorder(index, index - 1, rerender); }
    if (e.key === 'ArrowDown') { e.preventDefault(); reorder(index, index + 1, rerender); }
  });

  handle.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    handle.setPointerCapture(e.pointerId);
    const wraps = list();
    const from = wraps.indexOf(wrap);
    const rects = wraps.map((w) => w.getBoundingClientRect());
    const height = rects[from].height;
    const startY = e.clientY;
    let to = from;
    const card = wrap.querySelector<HTMLElement>('.task')!;
    card.classList.add('dragging');

    const move = (ev: PointerEvent) => {
      const dy = ev.clientY - startY;
      card.style.transform = `translateY(${dy}px)`;
      const pos = rects[from].top + rects[from].height / 2 + dy;
      to = wraps.filter((_, i) => i !== from && rects[i].top + rects[i].height / 2 < pos).length;
      wraps.forEach((w, i) => {
        if (i === from) return;
        w.classList.add('shift');
        const shift = from < to && i > from && i <= to ? -height : from > to && i >= to && i < from ? height : 0;
        w.style.transform = shift ? `translateY(${shift}px)` : '';
      });
    };
    const end = () => {
      handle.removeEventListener('pointermove', move);
      handle.removeEventListener('pointerup', end);
      handle.removeEventListener('pointercancel', end);
      if (to !== from) reorder(from, to, rerender);
      else rerender();
    };
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', end);
    handle.addEventListener('pointercancel', end);
  });
}

/* ---------- Wischen zum Entfernen ---------- */

function attachSwipe(card: HTMLElement, task: Task): void {
  card.addEventListener('pointerdown', (e) => {
    if ((e.target as HTMLElement).closest('.handle, .tbox, .tx, input')) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const base = openSwipeId === task.id ? -SWIPE_WIDTH : 0;
    let locked = false;
    let x = base;

    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      if (!locked && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
        locked = true;
        card.setPointerCapture(ev.pointerId);
        card.style.transition = 'none';
      }
      if (!locked) return;
      x = Math.max(-SWIPE_WIDTH, Math.min(0, base + dx));
      card.style.transform = `translateX(${x}px)`;
    };
    const end = () => {
      card.removeEventListener('pointermove', move);
      card.removeEventListener('pointerup', end);
      card.removeEventListener('pointercancel', end);
      card.style.transition = '';
      if (locked) {
        const open = x < -SWIPE_WIDTH / 2;
        openSwipeId = open ? task.id : null;
        card.style.transform = open ? `translateX(${-SWIPE_WIDTH}px)` : '';
        // Das folgende Klick-Ereignis (Text bearbeiten) unterdrücken
        card.addEventListener('click', (c) => c.stopPropagation(), { capture: true, once: true });
      } else if (openSwipeId === task.id) {
        openSwipeId = null;
        card.style.transform = '';
      }
    };
    card.addEventListener('pointermove', move);
    card.addEventListener('pointerup', end);
    card.addEventListener('pointercancel', end);
  });
}

/* ---------- Zeilen ---------- */

function taskRow(task: Task, rerender: () => void, opts: { index: number; list: () => HTMLElement[] } | null): HTMLElement {
  const t = de.aufgaben;
  const box = h('button', { class: 'tbox', role: 'checkbox', 'aria-checked': String(task.isDone), 'aria-label': task.text, onclick: () => toggle(task, rerender) });

  let label: HTMLElement;
  if (editingId === task.id) {
    const input = h('input', { type: 'text', class: 'edit', 'aria-label': task.text });
    input.value = task.text;
    const finish = (keep: boolean) => {
      if (editingId !== task.id) return;
      editingId = null;
      if (keep) {
        const next = editTaskText(task, input.value);
        replace(next);
        persist(next);
      }
      rerender();
    };
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') finish(true);
      if (e.key === 'Escape') finish(false);
    });
    input.addEventListener('blur', () => finish(true));
    requestAnimationFrame(() => input.focus());
    label = h('div', { class: 'tl' }, input);
  } else {
    label = h('span', { class: 'tl', onclick: () => { editingId = task.id; openSwipeId = null; rerender(); } }, task.text);
  }

  const x = h('button', { class: 'tx', 'aria-label': t.remove, onclick: () => removeTask(task, rerender) });
  x.append(fromHTML(ICON.close));

  const card = h('div', { class: 'task', 'data-done': String(task.isDone) }, box, label);
  const wrap = h('div', { class: 'task-wrap' }, h('button', { class: 'task-remove', onclick: () => removeTask(task, rerender) }, t.remove), card);

  if (opts) {
    const handle = h('button', { class: 'handle', 'aria-label': `${t.move}: ${task.text}` });
    handle.append(fromHTML(ICON.grip));
    card.append(handle);
    attachDrag(handle, wrap, opts.list, opts.index, rerender);
    attachSwipe(card, task);
    if (openSwipeId === task.id) card.style.transform = `translateX(${-SWIPE_WIDTH}px)`;
  }
  card.append(x);
  return wrap;
}

export function renderTaskList(rerender: () => void): Node[] {
  const t = de.aufgaben;
  const open = openTasks(tasks);
  const done = doneTasks(tasks);

  const input = h('input', { type: 'text', placeholder: t.placeholder, 'aria-label': t.placeholder, autocomplete: 'off', enterkeyhint: 'done' });
  const add = () => {
    const task = newTask(input.value, tasks, newId(), new Date());
    if (!task) return;
    tasks = [...tasks, task];
    persist(task);
    rerender();
    // Im selben Tippen fokussieren, damit die Tastatur auf dem iPhone offen bleibt
    document.querySelector<HTMLInputElement>('.add-row input')?.focus();
  };
  input.addEventListener('keydown', (e) => e.key === 'Enter' && add());

  const openWraps: HTMLElement[] = [];
  const list = () => openWraps;
  const openRows = open.map((task, index) => {
    const el = taskRow(task, rerender, { index, list });
    openWraps.push(el);
    return el;
  });

  const nodes: (Node | null)[] = [
    h('p', { class: 'sub' }, t.sub),
    h('div', { class: 'add-row' }, input, pillButton(t.add, add, 'sm')),
    showShortListHint(tasks) ? h('p', { class: 'small', style: 'margin:0 0 0.75rem' }, t.hint) : null,
    open.length ? groupedList(...openRows) : emptyState(t.empty),
    done.length
      ? h(
          'div',
          { class: 'link-row' },
          h('button', { class: 'link', onclick: () => { showDone = !showDone; rerender(); } }, showDone ? t.hideDone : t.showDone),
          h('button', { class: 'link', onclick: () => {
            for (const d of done) void remove('tasks', d.id).catch(() => {});
            tasks = tasks.filter((x) => !x.isDone);
            rerender();
          } }, t.clearDone),
        )
      : null,
    showDone && done.length ? h('div', { style: 'margin-top:0.75rem' }, groupedList(...done.map((d) => taskRow(d, rerender, null)))) : null,
  ];
  return nodes.filter((n): n is Node => n !== null);
}
