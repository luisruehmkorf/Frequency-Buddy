import { readdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';

// Schreibt die Liste aller App-Dateien nach dist/precache.json.
// Der Service Worker legt sie beim Installieren in den Cache, damit die App
// nach dem ersten Laden auch ohne Netz startet.
function precacheList(): Plugin {
  let outDir = 'dist';
  return {
    name: 'precache-list',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const walk = (dir: string): string[] =>
        readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
          e.isDirectory() ? walk(join(dir, e.name)) : [relative(outDir, join(dir, e.name))],
        );
      const skip = new Set(['precache.json', 'sw.js']);
      const files = walk(outDir).filter((f) => !skip.has(f) && !f.endsWith('.map') && f !== '.DS_Store');
      writeFileSync(join(outDir, 'precache.json'), JSON.stringify(files));
    },
  };
}

export default defineConfig({
  // Relativer Pfad: funktioniert auf GitHub Pages unter /<repo>/
  base: './',
  plugins: [precacheList()],
  test: {
    include: ['src/**/*.test.ts'],
  },
});
