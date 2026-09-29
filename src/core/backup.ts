// Sicherung: Export und Import als JSON (mit Schemaversion). Videos sind nicht Teil des Exports.
// Reine Funktionen (buildExport, parseImport, mergeData) sind testbar; exportAll/importAll sprechen mit IndexedDB.

import { CURRENT_VERSION, EXPORT_STORES, keyPathOf } from './schema';
import { getAll, put, clear } from './db';

export type Row = Record<string, unknown>;
export type BackupData = Record<string, Row[]>;

export interface BackupFile {
  app: 'frequency-buddy';
  schemaVersion: number;
  exportedAt: string;
  data: BackupData;
}

export function buildExport(data: BackupData, now: Date = new Date()): BackupFile {
  const clean: BackupData = {};
  for (const store of EXPORT_STORES) clean[store] = data[store] ?? [];
  return { app: 'frequency-buddy', schemaVersion: CURRENT_VERSION, exportedAt: now.toISOString(), data: clean };
}

/** Prüft eine Sicherungsdatei. Wirft mit verständlicher Meldung, wenn sie nicht passt. */
export function parseImport(json: string): BackupFile {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error('Diese Datei ist keine gültige Sicherung.');
  }
  const f = parsed as Partial<BackupFile>;
  if (!f || f.app !== 'frequency-buddy' || typeof f.schemaVersion !== 'number' || typeof f.data !== 'object' || f.data === null) {
    throw new Error('Diese Datei ist keine Sicherung von Frequency Buddy.');
  }
  if (f.schemaVersion > CURRENT_VERSION) {
    throw new Error('Diese Sicherung stammt aus einer neueren Version der App.');
  }
  return f as BackupFile;
}

/** Führt zwei Datenstände zusammen. Bei gleichem Schlüssel gewinnt der eingelesene Eintrag. */
export function mergeData(existing: BackupData, incoming: BackupData): BackupData {
  const result: BackupData = {};
  for (const store of EXPORT_STORES) {
    const key = keyPathOf(store);
    const map = new Map<unknown, Row>();
    for (const row of existing[store] ?? []) map.set(row[key], row);
    for (const row of incoming[store] ?? []) map.set(row[key], row);
    result[store] = [...map.values()];
  }
  return result;
}

export async function readAll(): Promise<BackupData> {
  const data: BackupData = {};
  for (const store of EXPORT_STORES) data[store] = await getAll<Row>(store);
  return data;
}

export async function writeAll(data: BackupData): Promise<void> {
  for (const store of EXPORT_STORES) {
    await clear(store);
    for (const row of data[store] ?? []) await put(store, row);
  }
}

export async function exportAll(): Promise<BackupFile> {
  return buildExport(await readAll());
}

export async function importAll(file: BackupFile, mode: 'replace' | 'merge'): Promise<void> {
  const next = mode === 'replace' ? file.data : mergeData(await readAll(), file.data);
  await writeAll(next);
}

/** Löscht alle Daten der App (auch Videos). */
export async function deleteEverything(): Promise<void> {
  for (const store of [...EXPORT_STORES, 'videos']) await clear(store);
}
