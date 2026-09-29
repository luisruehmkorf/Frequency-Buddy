// Datenbank-Schema (rein, ohne IndexedDB-Zugriff, damit testbar).
// Datenmodell laut docs/SPEC.md. Neue Versionen werden hier als weiterer Eintrag ergänzt;
// bestehende Einträge werden nie verändert, damit Daten bei Updates nie beschädigt werden.

export interface StoreDef {
  name: string;
  keyPath: string;
}

export interface SchemaVersion {
  version: number;
  /** Stores, die in dieser Version neu angelegt werden. */
  createStores: StoreDef[];
}

export const DB_NAME = 'frequency-buddy';

export const SCHEMA: SchemaVersion[] = [
  {
    version: 1,
    createStores: [
      { name: 'intentions', keyPath: 'id' },
      { name: 'morningEntries', keyPath: 'id' },
      { name: 'eveningEntries', keyPath: 'id' },
      { name: 'inspirationItems', keyPath: 'id' },
      { name: 'weeklyReviews', keyPath: 'id' },
      { name: 'dishes', keyPath: 'id' },
      { name: 'categories', keyPath: 'name' },
      { name: 'shoppingSelection', keyPath: 'dishId' },
      { name: 'checkedIngredients', keyPath: 'key' },
      { name: 'people', keyPath: 'id' },
      { name: 'tasks', keyPath: 'id' },
      { name: 'exercises', keyPath: 'id' },
      { name: 'workoutTemplates', keyPath: 'id' },
      { name: 'workoutSessions', keyPath: 'id' },
      // Singletons (ein Eintrag mit id = 'singleton')
      { name: 'connectionRound', keyPath: 'id' },
      { name: 'stilleDefaults', keyPath: 'id' },
      { name: 'settings', keyPath: 'id' },
      // Videos als Blobs, nicht Teil des Exports
      { name: 'videos', keyPath: 'id' },
    ],
  },
];

export const CURRENT_VERSION = SCHEMA[SCHEMA.length - 1].version;

/** Stores, die beim Upgrade von oldVersion auf newVersion angelegt werden müssen. */
export function storesToCreate(oldVersion: number, newVersion: number = CURRENT_VERSION): StoreDef[] {
  return SCHEMA.filter((s) => s.version > oldVersion && s.version <= newVersion).flatMap((s) => s.createStores);
}

/** Stores, die zum Export gehören (alles außer den Video-Blobs). */
export const EXPORT_STORES: string[] = SCHEMA.flatMap((s) => s.createStores)
  .map((s) => s.name)
  .filter((n) => n !== 'videos');

export function keyPathOf(store: string): string {
  const def = SCHEMA.flatMap((s) => s.createStores).find((s) => s.name === store);
  if (!def) throw new Error(`Unbekannter Speicher: ${store}`);
  return def.keyPath;
}
