import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

test('renders the explorer shell and account route', async () => {
  render(
    <MemoryRouter initialEntries={['/accounts']}>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByLabelText(/BlockScan home/i)).toBeInTheDocument();
  expect(await screen.findByRole('heading', { name: /Find an account/i })).toBeInTheDocument();
});
