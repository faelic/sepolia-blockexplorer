import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import StatePanel from './StatePanel';

test('presents a calm error state without exposing technical details', () => {
  render(
    <MemoryRouter>
      <StatePanel
        title="Network activity is unavailable"
        message="Live Sepolia activity is temporarily paused. Check your connection, then retry the feed."
        tone="error"
        action={{ label: 'Retry feed', onClick: jest.fn() }}
      />
    </MemoryRouter>,
  );

  expect(screen.getByRole('alert')).toBeInTheDocument();
  expect(screen.getByText(/Live Sepolia activity is temporarily paused/i)).toBeInTheDocument();
  expect(screen.queryByText('Technical details')).not.toBeInTheDocument();
  expect(screen.queryByText(/eth_blockNumber|requestBody/i)).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Retry feed/i })).toBeInTheDocument();
});
