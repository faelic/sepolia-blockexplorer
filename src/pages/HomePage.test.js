import { render } from '@testing-library/react';
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
