import fs from 'fs';
import path from 'path';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import HomeSearchHero from './HomeSearchHero';

test('renders a static track field and the featured token marquee', () => {
  const { container } = render(
    <MemoryRouter>
      <HomeSearchHero />
    </MemoryRouter>,
  );

  const featuredTokens = screen.getByRole('list', { name: /featured tokens/i });

  expect(featuredTokens).toHaveAttribute('tabindex', '0');

  ['USDT', 'BNB', 'USDC', 'LINK', 'SHIB', 'WETH', 'stETH'].forEach((token) => {
    expect(within(featuredTokens).getByText(token)).toBeInTheDocument();
  });

  expect(container.querySelector('.token-marquee__group[aria-hidden="true"]'))
    .toBeInTheDocument();
  expect(container.querySelectorAll('animateMotion, animatemotion')).toHaveLength(0);
  expect(container.querySelector('.track-network__routes')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
});

test('keeps both marquee groups viewport-wide with pause and reduced-motion fallbacks', () => {
  const css = fs.readFileSync(
    path.join(__dirname, 'homeHero.css'),
    'utf8',
  );

  expect(css).toMatch(/\.token-marquee__group\s*\{[^}]*min-width:\s*100vw/s);
  expect(css).toMatch(/\.token-marquee:hover[\s\S]*animation-play-state:\s*paused/);
  expect(css).toMatch(/prefers-reduced-motion:[\s\S]*\.token-marquee__track\s*\{[^}]*animation:\s*none/s);
});
