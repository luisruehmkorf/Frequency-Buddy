import { describe, it, expect } from 'vitest';
import { newTask, toggleTask, moveTask, openTasks, doneTasks, showShortListHint, editTaskText, TASK_SOFT_LIMIT } from './tasks';
import type { Task } from '../core/models';

const now = new Date('2026-05-04T06:30:00Z');
const task = (id: string, sortOrder: number, isDone = false): Task => ({ id, text: id, isDone, sortOrder, createdAt: now.toISOString() });

describe('Aufgaben', () => {
  it('ohne Text entsteht keine Aufgabe', () => {
    expect(newTask('   ', [], 'a', now)).toBeNull();
  });
  it('neue Aufgabe steht oben', () => {
    const list = [task('a', 0), task('b', 1)];
    const t = newTask(' Paket abholen ', list, 'c', now)!;
    expect(t.text).toBe('Paket abholen');
    expect(openTasks([...list, t])[0].id).toBe('c');
  });
  it('erste Aufgabe in leerer Liste', () => {
    expect(newTask('a', [], 'a', now)!.sortOrder).toBe(0);
  });
  it('erledigte Aufgaben zählen nicht für die Position neuer Aufgaben', () => {
    const list = [task('a', 5), task('z', -9, true)];
    expect(newTask('b', list, 'b', now)!.sortOrder).toBe(4);
  });
  it('Abhaken verschiebt in Erledigt, Öffnen stellt die Aufgabe nach oben', () => {
    const list = [task('a', 0), task('b', 1)];
    const done = toggleTask(list[1], list);
    expect(done.isDone).toBe(true);
    const all = [list[0], done];
    expect(openTasks(all).map((t) => t.id)).toEqual(['a']);
    expect(doneTasks(all).map((t) => t.id)).toEqual(['b']);
    const reopened = toggleTask(done, all);
    expect(reopened.isDone).toBe(false);
    expect(openTasks([list[0], reopened])[0].id).toBe('b');
  });
  it('Umordnen nummeriert neu und ändert nur, was sich ändert', () => {
    const open = [task('a', 0), task('b', 1), task('c', 2)];
    const moved = moveTask(open, 0, 2);
    expect(moved.map((t) => t.id)).toEqual(['b', 'c', 'a']);
    expect(moved.map((t) => t.sortOrder)).toEqual([0, 1, 2]);
    expect(moveTask(open, 1, 1)).toBe(open);
    expect(moveTask(open, 0, 9)).toBe(open);
  });
  it('Hinweis erst ab mehr als 12 offenen, Erledigte zählen nicht', () => {
    const open = Array.from({ length: TASK_SOFT_LIMIT }, (_, i) => task('t' + i, i));
    expect(showShortListHint(open)).toBe(false);
    expect(showShortListHint([...open, task('x', 99)])).toBe(true);
    expect(showShortListHint([...open, task('x', 99, true)])).toBe(false);
  });
  it('Bearbeiten ohne Text behält den alten Text', () => {
    expect(editTaskText(task('a', 0), '  ').text).toBe('a');
    expect(editTaskText(task('a', 0), ' neu ').text).toBe('neu');
  });
  it('kein Feld für Frist, Priorität oder Fortschritt', () => {
    expect(Object.keys(newTask('a', [], 'a', now)!).sort()).toEqual(['createdAt', 'id', 'isDone', 'sortOrder', 'text']);
  });
});
