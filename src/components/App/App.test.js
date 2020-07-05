import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('to be defined', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});
