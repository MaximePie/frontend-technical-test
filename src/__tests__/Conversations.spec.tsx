import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Conversations from '../pages/conversations/index';

describe('Conversations', () => {
  it('should render correctly Conversations', () => {
    render(<Conversations />);
    expect(
      screen.getByText(/Conversations/),
    // @ts-ignore
    ).toBeInTheDocument();
  });
});
