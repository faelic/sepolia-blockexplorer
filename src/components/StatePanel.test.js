import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import StatePanel from './StatePanel';

test('presents a calm error state with collapsible technical details', () => {
  render(
    <MemoryRouter>
      <StatePanel
        title="Network activity is unavailable"
        message="Live Sepolia activity is temporarily paused. Check your connection, then retry the feed."
        tone="error"
        action={{ label: 'Retry feed', onClick: jest.fn() }}
        detail="missing response requestBody eth_blockNumber"
      />
    </MemoryRouter>,
  );

  expect(screen.getByRole('alert')).toBeInTheDocument();
  expect(screen.getByText(/Live Sepolia activity is temporarily paused/i)).toBeInTheDocument();
  expect(screen.getByText('Technical details')).toBeInTheDocument();
  expect(screen.getByText(/eth_blockNumber/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Retry feed/i })).toBeInTheDocument();
});
