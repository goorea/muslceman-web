import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './index';

it('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText('primary');

  expect(linkElement).toBeInTheDocument();
});
