import { fireEvent, render, screen } from '@testing-library/react';

import AnimatedAction from '../AnimatedAction';
import { SearchIcon } from './search';
import { __iconAnimationControls } from 'motion/react';

jest.mock('motion/react', () => {
  const React = require('react');
  const controls = { start: jest.fn() };

  function motionElement(tag) {
    return React.forwardRef(({
      animate,
      initial,
      transition,
      variants,
      ...props
    }, ref) => React.createElement(tag, { ...props, ref }));
  }

  return {
    __iconAnimationControls: controls,
    motion: {
      circle: motionElement('circle'),
      line: motionElement('line'),
      path: motionElement('path'),
      rect: motionElement('rect'),
      svg: motionElement('svg'),
    },
    useAnimation: () => controls,
  };
});

test('runs the official icon animate and normal controls from the full action area', () => {
  render(
    <AnimatedAction type="button" icon={SearchIcon}>
      Search
    </AnimatedAction>,
  );

  const button = screen.getByRole('button', { name: 'Search' });
  fireEvent.mouseEnter(button);
  fireEvent.mouseLeave(button);
  fireEvent.focus(button);
  fireEvent.blur(button);

  expect(__iconAnimationControls.start.mock.calls.map(([variant]) => variant))
    .toEqual(['animate', 'normal', 'animate', 'normal']);
});
