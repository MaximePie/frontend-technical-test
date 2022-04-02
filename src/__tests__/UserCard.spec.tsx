import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import UserCard from '../components/molecules/UserCard';

const user = {
  id: 1,
  nickname: 'Thibaut',
  token: 'xxxx',
  image: 'https://www.nautiljon.com/images/perso/00/81/franky_1818.jpg',
};

describe('User Card', () => {
  it('Display the good name', () => {
    render(<UserCard user={user} actionText="Login" />);
    // @ts-ignore
    expect(screen.findByText(/Thibault/)).toBeInTheDocument;
  });
});
