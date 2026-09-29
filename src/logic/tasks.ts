// Aufgaben: eine einfache Liste. Keine Fristen, keine Zähler, keine Fortschrittsanzeige. Rein und testbar.

import type { Task } from '../core/models';

/** Ab mehr als 12 offenen Aufgaben ein leiser Hinweis. Keine Sperre. */
export const TASK_SOFT_LIMIT = 12;

const bySort = (a: Task, b: Task) => a.sortOrder - b.sortOrder;

export const openTasks = (list: Task[]): Task[] => list.filter((t) => !t.isDone).sort(bySort);
export const doneTasks = (list: Task[]): Task[] => list.filter((t) => t.isDone).sort(bySort);

export const showShortListHint = (list: Task[]): boolean => openTasks(list).length > TASK_SOFT_LIMIT;

/** Kleinste Sortierzahl unter den offenen Aufgaben minus eins, damit die Aufgabe oben steht. */
export function topOrder(list: Task[]): number {
  const open = list.filter((t) => !t.isDone);
  return open.length === 0 ? 0 : Math.min(...open.map((t) => t.sortOrder)) - 1;
}

/** Neue Aufgabe, erscheint oben. Ohne Text entsteht keine. */
export function newTask(text: string, list: Task[], id: string, now: Date): Task | null {
  const t = text.trim();
  if (!t) return null;
  return { id, text: t, isDone: false, sortOrder: topOrder(list), createdAt: now.toISOString() };
}

/** Haken setzen oder entfernen. Eine wieder geöffnete Aufgabe steht oben. */
export function toggleTask(task: Task, list: Task[]): Task {
  return task.isDone ? { ...task, isDone: false, sortOrder: topOrder(list) } : { ...task, isDone: true };
}

/** Verschiebt eine offene Aufgabe und nummeriert die offenen Aufgaben neu durch. */
export function moveTask(open: Task[], from: number, to: number): Task[] {
  if (from === to || from < 0 || to < 0 || from >= open.length || to >= open.length) return open;
  const next = [...open];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next.map((t, i) => (t.sortOrder === i ? t : { ...t, sortOrder: i }));
}

export function editTaskText(task: Task, text: string): Task {
  const t = text.trim();
  return t ? { ...task, text: t } : task;
}
