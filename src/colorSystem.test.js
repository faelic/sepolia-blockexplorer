import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(PROJECT_ROOT, relativePath), 'utf8');
}

function channelToLinear(channel) {
  const normalized = channel / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map((value) => parseInt(value, 16));
  const [red, green, blue] = channels.map(channelToLinear);
  return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
}

function contrast(foreground, background) {
  const light = Math.max(luminance(foreground), luminance(background));
  const dark = Math.min(luminance(foreground), luminance(background));
  return (light + 0.05) / (dark + 0.05);
}

test('brand accent is constrained to named tokens', () => {
  const tokenFiles = ['src/index.css'];
  const chromeFiles = [
    'src/App.css',
    'src/features/homeHero/homeHero.css',
    'public/blockscan-aperture.svg',
  ];

  expect(read('src/index.css')).toContain('--brand-accent: #3b6bff;');
  expect(read('src/index.css')).toContain('--brand-accent-soft: rgba(59, 107, 255, 0.14);');
  expect(read('src/index.css')).toContain('--brand-accent-line: rgba(59, 107, 255, 0.34);');
  expect([...tokenFiles, ...chromeFiles].map(read).join('\n')).not.toMatch(/#0044ff/i);
  expect(chromeFiles.map(read).join('\n')).not.toMatch(/#3b6bff/i);
});

test('ordinary interface chrome uses the near-monochrome token system', () => {
  const tokens = read('src/index.css');
  const chrome = [
    tokens
      .replace('--brand-accent: #3b6bff;', '')
      .replace('--brand-accent-soft: rgba(59, 107, 255, 0.14);', '')
      .replace('--brand-accent-line: rgba(59, 107, 255, 0.34);', ''),
    read('src/App.css'),
    read('src/features/homeHero/homeHero.css'),
    read('public/blockscan-aperture.svg'),
  ].join('\n');

  expect(chrome).not.toMatch(/#26a17b/i);
  expect(chrome).not.toMatch(/#0044ff/i);
  expect(chrome).not.toMatch(/--accent(?:-|:)/);
  expect(chrome).not.toMatch(/--line-accent/);
  expect(chrome).toContain('--canvas: #050505;');
  expect(chrome).toContain('--interactive: #f4f4f4;');
  expect(chrome).toContain('--success: #78d2a8;');
  expect(chrome).toContain('--warning: #d9b36b;');
  expect(chrome).toContain('--danger: #ff8f86;');
});

test.each([
  ['primary text', '#f4f4f4', '#050505'],
  ['secondary text', '#a3a3a3', '#050505'],
  ['tertiary text', '#7d7d7d', '#050505'],
  ['inverse action', '#080808', '#f4f4f4'],
  ['success status', '#78d2a8', '#0d0d0d'],
  ['warning status', '#d9b36b', '#0d0d0d'],
  ['danger status', '#ff8f86', '#0d0d0d'],
])('%s meets WCAG AA contrast', (_name, foreground, background) => {
  expect(contrast(foreground, background)).toBeGreaterThanOrEqual(4.5);
});

test('identity-bearing token artwork retains its authentic color', () => {
  expect(read('public/token-icons/usdt.svg')).toMatch(/#26a17b/i);
});
