import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import {
  classifyExplorerQuery,
  getExplorerQueryFromPathname,
} from '../lib/explorerSearch';
import ExplorerSearch, { getSearchDestination } from './ExplorerSearch';

describe('getSearchDestination', () => {
  test('routes block numbers', () => {
    expect(getSearchDestination('25869494')).toBe('/blocks/25869494');
  });

  test('routes wallet addresses', () => {
    const address = `0x${'a'.repeat(40)}`;
    expect(getSearchDestination(address)).toBe(`/accounts/${address}`);
  });

  test('routes transaction hashes', () => {
    const hash = `0x${'b'.repeat(64)}`;
    expect(getSearchDestination(hash)).toBe(`/tx/${hash}`);
  });

  test('rejects unsupported values', () => {
    expect(getSearchDestination('not-a-chain-value')).toBeNull();
  });

  test('trims whitespace without changing identifier casing', () => {
    const address = `0x${'aB'.repeat(20)}`;
    expect(classifyExplorerQuery(`  ${address}  `)).toEqual({
      type: 'address',
      query: address,
    });
  });

  test('distinguishes transaction hashes from addresses', () => {
    expect(classifyExplorerQuery(`0x${'c'.repeat(64)}`).type).toBe('transaction');
    expect(classifyExplorerQuery(`0x${'c'.repeat(40)}`).type).toBe('address');
  });

  test('recovers the visible query from explorer result routes', () => {
    expect(getExplorerQueryFromPathname('/blocks/25869494')).toBe('25869494');
    expect(getExplorerQueryFromPathname('/accounts')).toBe('');
  });

  test('submits a valid query directly from the keyboard', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });

    render(
      <Router history={history}>
        <ExplorerSearch id="keyboard-search" />
      </Router>,
    );

    userEvent.type(
      screen.getByLabelText('Search the Sepolia explorer'),
      '25869494{enter}',
    );

    expect(history.location.pathname).toBe('/blocks/25869494');
  });

  test.each([
    ['25869494', '/blocks/25869494'],
    [`0x${'a'.repeat(40)}`, `/accounts/0x${'a'.repeat(40)}`],
    [`0x${'b'.repeat(64)}`, `/tx/0x${'b'.repeat(64)}`],
  ])('keeps icon-only submission accessible for %s', (query, destination) => {
    const history = createMemoryHistory({ initialEntries: ['/'] });

    render(
      <Router history={history}>
        <ExplorerSearch
          id={`icon-search-${query.length}`}
          submitPresentation="icon-only"
        />
      </Router>,
    );

    userEvent.type(screen.getByLabelText('Search the Sepolia explorer'), query);
    userEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(history.location.pathname).toBe(destination);
  });
});
