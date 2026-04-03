import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

test('renders the explorer shell', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/ChainScope/i)).toBeInTheDocument();
  expect(screen.getByText(/Explorer Search/i)).toBeInTheDocument();
});
