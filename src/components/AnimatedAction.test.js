import { forwardRef, useImperativeHandle } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import AnimatedAction from './AnimatedAction';

function createMockIcon(startAnimation, stopAnimation) {
  return forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({ startAnimation, stopAnimation }));
    return <span data-testid="action-icon" aria-hidden="true" />;
  });
}

test('animates its icon from the full control hover and focus area', () => {
  const startAnimation = jest.fn();
  const stopAnimation = jest.fn();
  const MockIcon = createMockIcon(startAnimation, stopAnimation);

  render(
    <AnimatedAction type="button" icon={MockIcon}>
      Search
    </AnimatedAction>,
  );

  const button = screen.getByRole('button', { name: 'Search' });
  fireEvent.mouseEnter(button);
  fireEvent.mouseLeave(button);
  fireEvent.focus(button);
  fireEvent.blur(button);

  expect(startAnimation).toHaveBeenCalledTimes(2);
  expect(stopAnimation).toHaveBeenCalledTimes(2);
});

test('keeps icons static when reduced motion is requested', () => {
  const startAnimation = jest.fn();
  const stopAnimation = jest.fn();
  const MockIcon = createMockIcon(startAnimation, stopAnimation);
  const originalMatchMedia = window.matchMedia;

  window.matchMedia = jest.fn().mockReturnValue({
    matches: true,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });

  render(
    <AnimatedAction type="button" icon={MockIcon}>
      Copy
    </AnimatedAction>,
  );

  const button = screen.getByRole('button', { name: 'Copy' });
  fireEvent.mouseEnter(button);
  fireEvent.focus(button);

  expect(startAnimation).not.toHaveBeenCalled();

  window.matchMedia = originalMatchMedia;
});
