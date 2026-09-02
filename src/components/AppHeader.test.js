import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import AppHeader from './AppHeader';

class MockIntersectionObserver {
  observe() {}

  disconnect() {}
}

function renderHeader(pathname = '/') {
  const history = createMemoryHistory({ initialEntries: [pathname] });
  const view = render(
    <Router history={history}>
      <div className="app-shell">
        <AppHeader />
        <div id="home-hero-copy" />
      </div>
    </Router>,
  );

  return { history, ...view };
}

beforeEach(() => {
  window.IntersectionObserver = MockIntersectionObserver;
});

test.each(['/', '/accounts'])(
  'renders the global Search trigger on %s',
  (pathname) => {
    renderHeader(pathname);
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  },
);

test('opens empty with autofocus and restores focus after Escape', async () => {
  renderHeader('/');
  const trigger = screen.getByRole('button', { name: 'Search' });

  trigger.focus();
  userEvent.click(trigger);

  const input = screen.getByLabelText('Search the Sepolia explorer');
  expect(input).toHaveFocus();
  expect(input).toHaveValue('');
  expect(document.body).toHaveStyle({ overflow: 'hidden' });
  expect(document.querySelector('.app-shell')).toHaveAttribute('inert');

  fireEvent.keyDown(input, { key: 'Escape' });

  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();
  expect(document.body).not.toHaveStyle({ overflow: 'hidden' });
  expect(document.querySelector('.app-shell')).not.toHaveAttribute('inert');
});

test('dismisses from the backdrop and opens from the legacy focus event', async () => {
  renderHeader('/accounts');

  act(() => window.dispatchEvent(new Event('blockscan:focus-explorer-search')));
  expect(await screen.findByRole('dialog')).toBeInTheDocument();

  fireEvent.mouseDown(screen.getByTestId('global-search-backdrop'));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});

test('shows one classified destination, traps focus, and navigates without suggestions', async () => {
  const { history } = renderHeader('/accounts');
  userEvent.click(screen.getByRole('button', { name: 'Search' }));
  const input = screen.getByLabelText('Search the Sepolia explorer');
  const address = `0x${'a'.repeat(40)}`;
  const transaction = `0x${'b'.repeat(64)}`;

  userEvent.type(input, '24680');
  expect(screen.getByRole('button', { name: 'Open Block 24680' })).toBeInTheDocument();

  userEvent.clear(input);
  userEvent.type(input, address);
  expect(screen.getByRole('button', { name: `Open Address ${address}` })).toBeInTheDocument();

  userEvent.clear(input);
  userEvent.type(input, transaction);
  const destination = screen.getByRole('button', {
    name: `Open Transaction ${transaction}`,
  });

  input.focus();
  fireEvent.keyDown(input, { key: 'Tab', shiftKey: true });
  expect(destination).toHaveFocus();
  fireEvent.keyDown(destination, { key: 'Tab' });
  expect(input).toHaveFocus();

  userEvent.click(destination);
  expect(history.location.pathname).toBe(`/tx/${transaction}`);
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});

test('shows a compact no-match state for invalid input', () => {
  renderHeader('/');
  userEvent.click(screen.getByRole('button', { name: 'Search' }));
  userEvent.type(
    screen.getByLabelText('Search the Sepolia explorer'),
    'not-a-chain-value',
  );

  expect(screen.getByRole('status')).toHaveTextContent(
    'No matching block, transaction, or address.',
  );
  expect(screen.queryByRole('button', { name: /^Open / })).not.toBeInTheDocument();
});

test('navigates the classified overlay destination with Enter', async () => {
  const { history } = renderHeader('/');
  userEvent.click(screen.getByRole('button', { name: 'Search' }));
  userEvent.type(
    screen.getByLabelText('Search the Sepolia explorer'),
    '97531{enter}',
  );

  expect(history.location.pathname).toBe('/blocks/97531');
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});
