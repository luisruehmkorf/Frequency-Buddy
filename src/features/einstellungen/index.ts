import { de } from '../../texts/de';
import { h, fromHTML } from '../../core/ui/dom';
import { ICON } from '../../core/ui/icons';
import { segmented, groupedList } from '../../core/ui/components';
import { loadSettings, saveSettings, applyTheme, DEFAULT_SETTINGS, type AppSettings, type Theme } from '../../core/settings';
import type { ImpulseMode } from '../../core/models';
import { APP_VERSION } from '../../core/version';
import type { ViewResult } from '../../core/router';

let current: AppSettings | null = null;

/** Einstellungen. Weitere Abschnitte (Erinnerungen, Sicherung, ...) kommen mit den späteren Etappen. */
export function renderEinstellungen(rerender: () => void, onBack: () => void): ViewResult {
  if (current === null) {
    // Erster Aufruf: gespeicherte Werte laden und danach neu zeichnen.
    loadSettings().then((s) => {
      current = s;
      rerender();
    });
  }
  const s = current ?? DEFAULT_SETTINGS;
  const t = de.einstellungen;
  const back = h('button', { class: 'icon-btn', 'aria-label': t.back, onclick: onBack });
  back.append(fromHTML(ICON.back));

  const change = (patch: Partial<Omit<AppSettings, 'id'>>) => {
    current = { ...s, ...patch };
    if (patch.theme) applyTheme(patch.theme);
    void saveSettings(patch);
    rerender();
  };

  const heading = (text: string) => h('h2', { style: 'margin-bottom:0.75rem' }, text);

  return {
    nodes: [
      h('div', { class: 'top' }, back, h('span')),
      h('h1', {}, t.title),
      heading(t.appearance),
      segmented(
        [
          { id: 'auto', label: t.themeAuto },
          { id: 'light', label: t.themeLight },
          { id: 'dark', label: t.themeDark },
        ],
        s.theme,
        (id) => change({ theme: id as Theme }),
      ),
      heading(t.impulse),
      segmented(
        [
          { id: 'alternate', label: t.impulseAlternate },
          { id: 'identity', label: t.impulseIdentity },
          { id: 'gratitude', label: t.impulseGratitude },
        ],
        s.impulseMode,
        (id) => change({ impulseMode: id as ImpulseMode }),
      ),
      heading(t.info),
      groupedList(
        h('div', { class: 'row' }, `${t.version} ${APP_VERSION}`),
        h('div', { class: 'row' }, h('span', { class: 'small' }, t.privacy)),
      ),
    ],
  };
}
