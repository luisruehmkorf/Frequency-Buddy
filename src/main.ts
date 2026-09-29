import './core/styles/tokens.css';
import './core/styles/base.css';
import './core/styles/components.css';

import { de } from './texts/de';
import { ICON } from './core/ui/icons';
import { mountWaveGradient } from './core/ui/waves';
import { applyPhase } from './core/theme';
import { registerTabs, render, go } from './core/router';
import { openDB } from './core/db';
import { renderHeute } from './features/heute';
import { renderVorsaetze } from './features/vorsaetze';
import { renderKueche } from './features/kueche';
import { renderConnection } from './features/connection';
import { renderInspiration } from './features/inspiration';

applyPhase();
mountWaveGradient();

registerTabs([
  { id: 'heute', label: de.tabs.heute, icon: ICON.heute, render: () => renderHeute() },
  { id: 'vorsaetze', label: de.tabs.vorsaetze, icon: ICON.vorsaetze, render: () => renderVorsaetze(render) },
  { id: 'kueche', label: de.tabs.kueche, icon: ICON.kueche, render: renderKueche },
  { id: 'connection', label: de.tabs.connection, icon: ICON.connection, render: renderConnection },
  { id: 'inspiration', label: de.tabs.inspiration, icon: ICON.inspiration, render: renderInspiration },
]);

go('heute');

// Datenbank früh öffnen, damit Migrationen beim Start laufen.
openDB().catch(() => {
  /* Speicher nicht verfügbar (z. B. privates Fenster): die App bleibt bedienbar */
});

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
