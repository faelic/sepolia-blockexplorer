// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('@number-flow/react', () => {
  const React = require('react');

  return function MockNumberFlow({ value, locales, format, className }) {
    const formatted = new Intl.NumberFormat(locales || 'en-US', format).format(value);
    return React.createElement('span', { className }, formatted);
  };
});
