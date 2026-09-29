// Wellenmotiv (Markenzeichen): Startseiten-Wellen, Atemlinie, Abschlusslinie.
// Die Pfadberechnung ist rein und in wavePath/fillPath testbar; Animation nutzt requestAnimationFrame.

import { fromHTML } from './dom';

const SVG_NS = 'http://www.w3.org/2000/svg';

export const prefersReducedMotion = (): boolean =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Linienwelle mit weichem Auslaufen an den Rändern. */
export function wavePath(W: number, H: number, amp: number, k: number, phase: number, step: number): string {
  let d = '';
  for (let x = 0; x <= W; x += step) {
    const env = Math.pow(Math.sin((Math.PI * x) / W), 0.75);
    const y = H / 2 + amp * env * Math.sin(k * x + phase);
    d += (x === 0 ? 'M' : 'L') + x + ' ' + y.toFixed(1);
  }
  return d;
}

/** Gefüllte Welle bis zum unteren Rand. */
export function fillPath(W: number, H: number, base: number, amp: number, k: number, phase: number, step: number): string {
  let d = 'M0 ' + H;
  const point = (x: number) => ' L' + x + ' ' + (base + amp * Math.sin(k * x + phase)).toFixed(1);
  let x = 0;
  for (; x < W; x += step) d += point(x);
  d += point(W); // letzter Punkt exakt am Rand, sonst entsteht ein Absatz
  return d + ' L' + W + ' ' + H + ' Z';
}

/** Gemeinsamer Farbverlauf für alle Linienwellen (Farben aus --w1..--w3). Einmalig in die Seite setzen. */
export function mountWaveGradient(): void {
  if (document.getElementById('wg')) return;
  const svg = fromHTML(
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
      '<linearGradient id="wg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="400" y2="0">' +
      '<stop offset="0" style="stop-color:var(--w1)"/><stop offset="0.5" style="stop-color:var(--w2)"/>' +
      '<stop offset="1" style="stop-color:var(--w3)"/></linearGradient></defs></svg>',
  );
  document.body.prepend(svg);
}

function svgEl(name: string, cls: string): SVGPathElement {
  const p = document.createElementNS(SVG_NS, name) as SVGPathElement;
  p.setAttribute('class', cls);
  return p;
}

/** Startseiten-Karte: drei gefüllte Wellenschichten, sehr langsam treibend. */
export function heroWaves(): SVGSVGElement {
  const W = 400, H = 110;
  const svg = document.createElementNS(SVG_NS, 'svg') as SVGSVGElement;
  svg.setAttribute('class', 'wave');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('aria-hidden', 'true');
  const back = svgEl('path', 'fb'), mid = svgEl('path', 'fm'), front = svgEl('path', 'ff');
  svg.append(back, mid, front);

  const draw = (t: number) => {
    back.setAttribute('d', fillPath(W, H, 44, 9, 0.021, t * 0.2 + 1, 6));
    mid.setAttribute('d', fillPath(W, H, 62, 10, 0.027, -t * 0.26 + 3, 6));
    front.setAttribute('d', fillPath(W, H, 80, 9, 0.033, t * 0.32 + 5, 6));
  };

  if (prefersReducedMotion()) {
    draw(1);
    return svg;
  }
  const t0 = performance.now();
  const frame = (now: number) => {
    if (!svg.isConnected && now - t0 > 200) return; // Element entfernt: Animation endet
    draw((now - t0) / 1000);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
  return svg;
}

export interface BreathHandle {
  element: HTMLElement;
  /** Startet einen Atemzug (flach, hoch, flach) und ruft danach onDone. */
  start(seconds: number, onDone?: () => void): void;
  cancel(): void;
}

/** Atemlinie: drei dünne Linien, Amplitude folgt einem Atemzug. Bei reduzierter Bewegung statisch mit Text. */
export function breathLine(): BreathHandle {
  const W = 400, H = 200;
  const label = document.createElement('div');
  label.className = 'breath-label';
  label.setAttribute('aria-live', 'polite');
  const svg = document.createElementNS(SVG_NS, 'svg') as SVGSVGElement;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('aria-hidden', 'true');
  const p2 = svgEl('path', 'w2'), p3 = svgEl('path', 'w3'), p1 = svgEl('path', 'w1');
  svg.append(p2, p3, p1);
  const element = document.createElement('div');
  element.className = 'breath';
  element.append(label, svg);

  const draw = (amp: number, t: number) => {
    p1.setAttribute('d', wavePath(W, H, 64 * amp, 0.045, t * 1.5, 4));
    p2.setAttribute('d', wavePath(W, H, 36 * amp, 0.07, -t * 1.1 + 1, 4));
    p3.setAttribute('d', wavePath(W, H, 48 * amp, 0.055, t * 0.8 + 3, 4));
  };
  draw(0, 0);

  let raf = 0;
  let timer = 0;
  const cancel = () => {
    cancelAnimationFrame(raf);
    clearTimeout(timer);
  };

  const start = (seconds: number, onDone?: () => void) => {
    cancel();
    const finish = () => {
      label.textContent = 'Gut.';
      draw(0, 0);
      onDone?.();
    };
    if (prefersReducedMotion()) {
      draw(0.55, 0.4);
      let left = seconds;
      label.textContent = `Noch ${left} Sekunden`;
      const tick = () => {
        timer = window.setTimeout(() => {
          left--;
          if (left <= 0) return finish();
          label.textContent = `Noch ${left} Sekunden`;
          tick();
        }, 1000);
      };
      tick();
      return;
    }
    const t0 = performance.now();
    label.textContent = 'Einatmen';
    const frame = (now: number) => {
      const t = (now - t0) / 1000;
      const p = Math.min(t / seconds, 1);
      draw(Math.pow(Math.sin(Math.PI * p), 0.9), t);
      label.textContent = p < 0.5 ? 'Einatmen' : 'Ausatmen';
      if (p < 1) raf = requestAnimationFrame(frame);
      else finish();
    };
    raf = requestAnimationFrame(frame);
  };

  return { element, start, cancel };
}

/** Abschluss-Moment: eine flache Linie zeichnet sich von links nach rechts, darunter ein ruhiger Satz. */
export function doneMoment(text: string): HTMLElement {
  const el = document.createElement('div');
  el.className = 'done';
  el.append(
    fromHTML('<svg viewBox="0 0 400 30" aria-hidden="true"><path d="M20 15H380"/></svg>'),
    Object.assign(document.createElement('h1'), { textContent: text }),
  );
  return el;
}
