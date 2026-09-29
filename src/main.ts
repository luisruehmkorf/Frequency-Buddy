import './core/styles/tokens.css';
import './core/styles/base.css';
import './core/styles/components.css';

import { de } from './texts/de';
import { ICON } from './core/ui/icons';
import { mountWaveGradient } from './core/ui/waves';
import { applyPhase } from './core/theme';
import { registerTabs, render, go, openOverlay, closeOverlay } from './core/router';
import { loadSettings, applyTheme } from './core/settings';
import { openDB } from './core/db';
import { renderHeute } from './features/heute';
import { renderEinstellungen } from './features/einstellungen';
import { startRitual } from './features/rituale';
import { openRueckblick } from './features/rueckblick';
import { renderVorsaetze } from './features/vorsaetze';
import { renderKueche } from './features/kueche';
import { renderConnection } from './features/connection';
import { renderInspiration } from './features/inspiration';

function openSettings(): void {
  openOverlay(() => renderEinstellungen(render, closeOverlay));
}

applyPhase();
mountWaveGradient();

registerTabs([
  { id: 'heute', label: de.tabs.heute, icon: ICON.heute, render: () => renderHeute({ onSettings: openSettings, onStart: (k) => void startRitual(k), onRueckblick: () => void openRueckblick() }) },
  { id: 'vorsaetze', label: de.tabs.vorsaetze, icon: ICON.vorsaetze, render: () => renderVorsaetze(render) },
  { id: 'kueche', label: de.tabs.kueche, icon: ICON.kueche, render: renderKueche },
  { id: 'connection', label: de.tabs.connection, icon: ICON.connection, render: renderConnection },
  { id: 'inspiration', label: de.tabs.inspiration, icon: ICON.inspiration, render: renderInspiration },
]);

go('heute');

// Gespeicherte Darstellung anwenden (Hell, Dunkel oder Automatisch).
loadSettings().then((s) => applyTheme(s.theme));

// Datenbank früh öffnen, damit Migrationen beim Start laufen.
openDB().catch(() => {
  /* Speicher nicht verfügbar (z. B. privates Fenster): die App bleibt bedienbar */
});

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
