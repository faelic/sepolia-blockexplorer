import { render } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import { MemoryRouter } from 'react-router-dom';

import HomePage from './HomePage';

jest.mock('../hooks/useRecentBlocks', () => () => ({
  latestBlockNumber: null,
  blocks: [],
  loading: false,
  error: null,
  retry: jest.fn(),
}));

test('places the sticky marquee rail between the hero and activity content', () => {
  const { container } = render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  const homePage = container.querySelector('.home-page');
  const hero = homePage.querySelector('.home-search-hero');
  const rail = homePage.querySelector('.home-token-marquee-rail');
  const activity = homePage.querySelector('.home-activity');

  expect(hero.nextElementSibling).toBe(rail);
  expect(rail.nextElementSibling).toBe(activity);
  expect(rail.querySelector('.token-marquee')).toBeInTheDocument();
  expect(hero.querySelector('.token-marquee')).not.toBeInTheDocument();
});

test('keeps the activity handoff tight and centers the home intro copy', () => {
  const css = fs.readFileSync(
    path.join(__dirname, '..', 'App.css'),
    'utf8',
  );

  expect(css).toMatch(/\.home-activity\s*\{[^}]*padding:\s*42px 0 112px/s);
  expect(css).toMatch(/\.home-activity::before\s*\{[^}]*top:\s*-72px/s);
  expect(css).toMatch(/\.home-activity \.page-intro\s*\{[^}]*align-items:\s*center/s);
  expect(css).toMatch(/\.home-activity \.page-intro\s*\{[^}]*justify-content:\s*center/s);
  expect(css).toMatch(/\.home-activity \.page-intro\s*\{[^}]*text-align:\s*center/s);
  expect(css).toMatch(/\.home-activity \.page-intro p\s*\{[^}]*margin-left:\s*auto/s);
});
