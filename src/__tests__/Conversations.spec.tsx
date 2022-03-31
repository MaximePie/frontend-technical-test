import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Index from '../pages';

describe('Conversations', () => {
  it('should render correctly Conversations', () => {
    render(<Conversations />);
    expect(
      screen.getByText(/Index/),
    // @ts-ignore
    ).toBeInTheDocument();
  });
});
