import { describe, it, expect } from 'vitest';
import { buildExport, parseImport, mergeData, type BackupData } from './backup';
import { EXPORT_STORES, CURRENT_VERSION } from './schema';

const sample: BackupData = {
  tasks: [{ id: 'a', text: 'Paket abholen', isDone: false }],
  categories: [{ name: 'Vegan' }],
  intentions: [{ id: 'i1', what: 'Mindestens dreimal pro Woche ins Gym', isActive: true }],
};

describe('Export und Import', () => {
  it('Export enthält Schemaversion und alle Speicher', () => {
    const file = buildExport(sample, new Date('2026-01-01T10:00:00Z'));
    expect(file.app).toBe('frequency-buddy');
    expect(file.schemaVersion).toBe(CURRENT_VERSION);
    expect(Object.keys(file.data).sort()).toEqual([...EXPORT_STORES].sort());
    expect(file.data.videos).toBeUndefined();
  });

  it('läuft verlustfrei im Kreis', () => {
    const json = JSON.stringify(buildExport(sample));
    const back = parseImport(json);
    expect(back.data.tasks).toEqual(sample.tasks);
    expect(back.data.categories).toEqual(sample.categories);
    expect(back.data.intentions).toEqual(sample.intentions);
  });

  it('lehnt fremde und kaputte Dateien ab', () => {
    expect(() => parseImport('kein json')).toThrow();
    expect(() => parseImport('{"app":"anderes"}')).toThrow();
    const newer = { ...buildExport(sample), schemaVersion: CURRENT_VERSION + 1 };
    expect(() => parseImport(JSON.stringify(newer))).toThrow();
  });

  it('Zusammenführen: gleicher Schlüssel wird ersetzt, Neues kommt dazu', () => {
    const existing: BackupData = { tasks: [{ id: 'a', text: 'alt' }, { id: 'b', text: 'bleibt' }] };
    const incoming: BackupData = { tasks: [{ id: 'a', text: 'neu' }, { id: 'c', text: 'dazu' }] };
    const merged = mergeData(existing, incoming);
    expect(merged.tasks).toHaveLength(3);
    expect(merged.tasks.find((r) => r.id === 'a')?.text).toBe('neu');
  });
});
