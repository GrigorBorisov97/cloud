import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders component with specific text', () => {
  const { getByText } = render(<App />);
  const textElement = getByText('Hello, Grigor');
  expect(textElement).toBeInTheDocument();
  const textDownload = getByText('Download');
  expect(textDownload).toBeInTheDocument();
});