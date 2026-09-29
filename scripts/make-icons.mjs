// Erzeugt die App-Icons (Navy mit drei feinen hellblauen Wellenlinien) ohne Zusatzpakete.
// Aufruf: node scripts/make-icons.mjs
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';

const NAVY = [15, 27, 54];
const LINES = [
  { color: [125, 184, 247], w: 0.030, amp: 0.085, k: 2, dy: 0, phase: 0 },
  { color: [169, 211, 251], w: 0.020, amp: 0.06, k: 2, dy: -0.15, phase: 0.8 },
  { color: [215, 235, 254], w: 0.020, amp: 0.06, k: 2, dy: 0.15, phase: 1.6 },
];

function crc32(buf) {
  let c, crc = ~0;
  for (let n = 0; n < buf.length; n++) {
    c = (crc ^ buf[n]) & 0xff;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crc = (crc >>> 8) ^ c;
  }
  return ~crc >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function png(size) {
  const raw = Buffer.alloc((size * 3 + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (size * 3 + 1)] = 0;
    for (let x = 0; x < size; x++) {
      const u = x / size, v = y / size;
      let rgb = NAVY;
      for (const L of LINES) {
        const env = Math.pow(Math.sin(Math.PI * Math.min(Math.max((u - 0.14) / 0.72, 0), 1)), 0.75);
        const fy = 0.5 + L.dy + L.amp * env * Math.sin(L.k * 2 * Math.PI * ((u - 0.14) / 0.72) + L.phase);
        const slope = L.amp * env * L.k * 2 * Math.PI / 0.72 * Math.cos(L.k * 2 * Math.PI * ((u - 0.14) / 0.72) + L.phase);
        const dist = Math.abs(v - fy) / Math.sqrt(1 + slope * slope);
        const inside = u >= 0.14 && u <= 0.86;
        const a = inside ? Math.min(Math.max((L.w / 2 - dist) * size + 0.5, 0), 1) : 0;
        if (a > 0) rgb = rgb.map((c, i) => Math.round(c * (1 - a) + L.color[i] * a));
      }
      const o = y * (size * 3 + 1) + 1 + x * 3;
      raw[o] = rgb[0]; raw[o + 1] = rgb[1]; raw[o + 2] = rgb[2];
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

mkdirSync('public/icons', { recursive: true });
writeFileSync('public/icons/icon-192.png', png(192));
writeFileSync('public/icons/icon-512.png', png(512));
writeFileSync('public/icons/apple-touch-icon.png', png(180));
console.log('Icons geschrieben.');
