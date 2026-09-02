import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ToastProvider } from '../components/ToastProvider';
import WatchlistPage from './WatchListPage';

const FIRST = `0x${'1'.repeat(40)}`;
const SECOND = `0x${'2'.repeat(40)}`;

function renderPage() {
  localStorage.setItem('blockexplorer_watchlist', JSON.stringify([FIRST, SECOND]));
  return render(
    <MemoryRouter>
      <ToastProvider>
        <div className="app-shell" />
        <WatchlistPage />
      </ToastProvider>
    </MemoryRouter>,
  );
}

beforeEach(() => localStorage.clear());

test('requires confirmation before removing a saved wallet', async () => {
  renderPage();
  const removeButtons = screen.getAllByRole('button', { name: /^Remove$/ });
  fireEvent.click(removeButtons[0]);

  expect(screen.getByRole('alertdialog')).toHaveTextContent('Remove this wallet?');
  expect(JSON.parse(localStorage.getItem('blockexplorer_watchlist'))).toEqual([FIRST, SECOND]);

  fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
  await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument());
  expect(JSON.parse(localStorage.getItem('blockexplorer_watchlist'))).toEqual([FIRST, SECOND]);

  fireEvent.click(screen.getAllByRole('button', { name: /^Remove$/ })[0]);
  fireEvent.mouseDown(screen.getByTestId('confirm-dialog-backdrop'));
  await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument());
  expect(JSON.parse(localStorage.getItem('blockexplorer_watchlist'))).toEqual([FIRST, SECOND]);

  fireEvent.click(screen.getAllByRole('button', { name: /^Remove$/ })[0]);
  fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
  await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument());
  expect(JSON.parse(localStorage.getItem('blockexplorer_watchlist'))).toEqual([FIRST, SECOND]);
});

test('removes only after confirmation and Undo restores the original order', async () => {
  renderPage();
  fireEvent.click(screen.getAllByRole('button', { name: /^Remove$/ })[0]);
  fireEvent.click(screen.getByRole('button', { name: 'Remove wallet' }));

  await waitFor(() => {
    expect(JSON.parse(localStorage.getItem('blockexplorer_watchlist'))).toEqual([SECOND]);
  });
  expect(screen.getByText('Wallet removed')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
  await waitFor(() => {
    expect(JSON.parse(localStorage.getItem('blockexplorer_watchlist'))).toEqual([FIRST, SECOND]);
  });
  expect(screen.getByText('Wallet restored')).toBeInTheDocument();
});
