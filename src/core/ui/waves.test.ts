import { describe, it, expect } from 'vitest';
import { wavePath, fillPath } from './waves';
import { phaseForHour } from '../theme';

describe('Wellen', () => {
  it('Linienwelle beginnt und endet auf der Mittellinie', () => {
    const d = wavePath(400, 200, 60, 0.05, 1, 4);
    expect(d.startsWith('M0 100.0')).toBe(true);
    expect(d.endsWith('L400 100.0')).toBe(true);
  });
  it('flache Welle (Amplitude 0) liegt auf einer Höhe', () => {
    const ys = new Set(wavePath(400, 200, 0, 0.05, 0, 4).match(/ (\d+\.\d)/g));
    expect(ys.size).toBe(1);
  });
  it('gefüllte Welle ist geschlossen', () => {
    expect(fillPath(400, 110, 60, 9, 0.02, 0, 6).endsWith('Z')).toBe(true);
  });
});

describe('Tageslicht-Phase', () => {
  it('Morgen 05 bis 16 Uhr, sonst Abend', () => {
    expect(phaseForHour(4)).toBe('evening');
    expect(phaseForHour(5)).toBe('morning');
    expect(phaseForHour(15)).toBe('morning');
    expect(phaseForHour(16)).toBe('evening');
    expect(phaseForHour(23)).toBe('evening');
  });
});
