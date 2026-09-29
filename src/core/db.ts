// IndexedDB-Schicht: ausschließlich lokal, versioniert mit Migrationen.

import { DB_NAME, CURRENT_VERSION, storesToCreate } from './schema';

let dbPromise: Promise<IDBDatabase> | null = null;

export function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, CURRENT_VERSION);
    req.onupgradeneeded = (event) => {
      const db = req.result;
      for (const store of storesToCreate(event.oldVersion)) {
        if (!db.objectStoreNames.contains(store.name)) db.createObjectStore(store.name, { keyPath: store.keyPath });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => {
      dbPromise = null;
      reject(req.error);
    };
  });
  return dbPromise;
}

function run<T>(store: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDB().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const tx = db.transaction(store, mode);
        const req = fn(tx.objectStore(store));
        tx.oncomplete = () => resolve(req.result);
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
      }),
  );
}

export const getAll = <T>(store: string): Promise<T[]> => run<T[]>(store, 'readonly', (s) => s.getAll());
export const get = <T>(store: string, key: IDBValidKey): Promise<T | undefined> => run<T | undefined>(store, 'readonly', (s) => s.get(key));
export const put = (store: string, value: unknown): Promise<IDBValidKey> => run(store, 'readwrite', (s) => s.put(value));
export const remove = (store: string, key: IDBValidKey): Promise<undefined> => run<undefined>(store, 'readwrite', (s) => s.delete(key));
export const clear = (store: string): Promise<undefined> => run<undefined>(store, 'readwrite', (s) => s.clear());

export function newId(): string {
  return crypto.randomUUID();
}
