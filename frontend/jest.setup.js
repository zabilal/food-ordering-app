// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => Promise.resolve()),
    };
  },
}));

// Mock next/image
jest.mock('next/image', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { default: img } = require('next/image');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react');
  return function ImageMock(props: any) {
    // eslint-disable-next-line jsx-a11y/alt-text
    return React.createElement('img', {
      ...props,
      // Use blurDataURL as src for testing
      src: props.src,
      // Add a special prop for testing
      'data-testid': 'mock-image',
    });
  };
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock window.scrollTo
window.scrollTo = jest.fn();
