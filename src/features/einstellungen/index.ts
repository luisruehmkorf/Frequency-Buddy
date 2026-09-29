import { de } from '../../texts/de';
import { h, fromHTML } from '../../core/ui/dom';
import { ICON } from '../../core/ui/icons';
import { segmented, groupedList } from '../../core/ui/components';
import { loadSettings, saveSettings, applyTheme, type Theme } from '../../core/settings';
import { APP_VERSION } from '../../core/version';
import type { ViewResult } from '../../core/router';

let theme: Theme | null = null;

/** Einstellungen. Weitere Abschnitte (Erinnerungen, Sicherung, ...) kommen mit den späteren Etappen. */
export function renderEinstellungen(rerender: () => void, onBack: () => void): ViewResult {
  if (theme === null) {
    // Erster Aufruf: gespeicherten Wert laden und danach neu zeichnen.
    loadSettings().then((s) => {
      theme = s.theme;
      rerender();
    });
  }
  const t = de.einstellungen;
  const back = h('button', { class: 'icon-btn', 'aria-label': t.back, onclick: onBack });
  back.append(fromHTML(ICON.back));

  const seg = segmented(
    [
      { id: 'auto', label: t.themeAuto },
      { id: 'light', label: t.themeLight },
      { id: 'dark', label: t.themeDark },
    ],
    theme ?? 'auto',
    (id) => {
      theme = id as Theme;
      applyTheme(theme);
      void saveSettings({ theme });
      rerender();
    },
  );

  return {
    nodes: [
      h('div', { class: 'top' }, back, h('span')),
      h('h1', {}, t.title),
      h('h2', { style: 'margin-bottom:0.75rem' }, t.appearance),
      seg,
      h('h2', { style: 'margin-bottom:0.75rem' }, t.info),
      groupedList(
        h('div', { class: 'row' }, `${t.version} ${APP_VERSION}`),
        h('div', { class: 'row' }, h('span', { class: 'small' }, t.privacy)),
      ),
    ],
  };
}
