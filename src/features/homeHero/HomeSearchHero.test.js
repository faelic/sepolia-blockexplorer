import fs from 'fs';
import path from 'path';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CryptoTokenMarquee from './CryptoTokenMarquee';
import HomeSearchHero from './HomeSearchHero';

test('renders the static track field and hero search without nesting the marquee', () => {
  const { container } = render(
    <MemoryRouter>
      <HomeSearchHero />
    </MemoryRouter>,
  );

  expect(container.querySelector('.token-marquee')).not.toBeInTheDocument();
  expect(container.querySelectorAll('animateMotion, animatemotion')).toHaveLength(0);
  expect(container.querySelector('.track-network__routes')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
});

test('renders all featured tokens with an accessibility-hidden duplicate', () => {
  const { container } = render(<CryptoTokenMarquee />);
  const featuredTokens = screen.getByRole('list', { name: /featured tokens/i });

  expect(featuredTokens).toHaveAttribute('tabindex', '0');

  ['USDT', 'BNB', 'USDC', 'LINK', 'SHIB', 'WETH', 'stETH'].forEach((token) => {
    expect(within(featuredTokens).getByText(token)).toBeInTheDocument();
  });

  expect(container.querySelector('.token-marquee__group[aria-hidden="true"]'))
    .toBeInTheDocument();
});

test('pins the marquee rail while preserving loop, pause, and reduced-motion behavior', () => {
  const css = fs.readFileSync(
    path.join(__dirname, 'homeHero.css'),
    'utf8',
  );

  expect(css).toMatch(/\.home-token-marquee-rail\s*\{[^}]*position:\s*sticky/s);
  expect(css).toMatch(/\.home-token-marquee-rail\s*\{[^}]*top:\s*calc\(var\(--home-hero-height\) - var\(--token-marquee-rail-height\)\)/s);
  expect(css).toMatch(/\.home-token-marquee-rail\s*\{[^}]*margin-top:\s*calc\(var\(--token-marquee-rail-height\) \* -1\)/s);
  expect(css).toMatch(/\.token-marquee__group\s*\{[^}]*min-width:\s*100vw/s);
  expect(css).toMatch(/\.token-marquee:hover[\s\S]*animation-play-state:\s*paused/);
  expect(css).toMatch(/prefers-reduced-motion:[\s\S]*\.token-marquee__track\s*\{[^}]*animation:\s*none/s);
});
