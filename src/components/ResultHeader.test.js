import { render, screen } from '@testing-library/react';

import ResultHeader from './ResultHeader';

jest.mock('motion/react', () => {
  const React = require('react');

  return {
    motion: {
      header: ({ initial, animate, transition, ...props }) => React.createElement(
        'header',
        {
          ...props,
          'data-initial': JSON.stringify(initial),
          'data-transition': JSON.stringify(transition),
        },
      ),
    },
    useReducedMotion: () => true,
  };
});

test('removes route translation and duration for reduced motion', () => {
  render(
    <ResultHeader
      type="Transaction"
      identifier={`0x${'a'.repeat(64)}`}
      description="Transaction details"
    />,
  );

  const header = screen.getByRole('banner');
  expect(header).toHaveAttribute('data-initial', 'false');
  expect(header).toHaveAttribute('data-transition', JSON.stringify({ duration: 0 }));
});
