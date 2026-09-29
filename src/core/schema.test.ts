import { describe, it, expect } from 'vitest';
import { SCHEMA, CURRENT_VERSION, storesToCreate, EXPORT_STORES, keyPathOf } from './schema';

describe('Schema und Migrationen', () => {
  it('Versionen sind aufsteigend und eindeutig', () => {
    const versions = SCHEMA.map((s) => s.version);
    expect(versions).toEqual([...versions].sort((a, b) => a - b));
    expect(new Set(versions).size).toBe(versions.length);
    expect(CURRENT_VERSION).toBe(versions[versions.length - 1]);
  });

  it('neue Datenbank legt alle Speicher an', () => {
    const names = storesToCreate(0).map((s) => s.name);
    expect(names).toContain('intentions');
    expect(names).toContain('videos');
    expect(new Set(names).size).toBe(names.length);
  });

  it('aktuelle Datenbank braucht keine Migration', () => {
    expect(storesToCreate(CURRENT_VERSION)).toEqual([]);
  });

  it('Videos gehören nicht zum Export', () => {
    expect(EXPORT_STORES).not.toContain('videos');
    expect(EXPORT_STORES).toContain('tasks');
  });

  it('Schlüssel je Speicher', () => {
    expect(keyPathOf('categories')).toBe('name');
    expect(keyPathOf('tasks')).toBe('id');
    expect(() => keyPathOf('gibtEsNicht')).toThrow();
  });
});
