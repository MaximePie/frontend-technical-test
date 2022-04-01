import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Message from '../components/atoms/Message';
import { user } from '../utils/UserContext';
import { Message as MessageType } from '../types/message';

const messageSentByDonkey: MessageType = {
  id: 5,
  conversationId: 1,
  timestamp: 1625648867,
  authorId: 2,
  body: "I can relate. I'm too used to React Router. \uD83D\uDE2D",
};

const messageSentByUser: MessageType = {
  id: 6,
  conversationId: 1,
  timestamp: 1625648867,
  authorId: 1,
  body: 'OH! What a day!',
};

const contact = 'Donkey';

describe('Message', () => {
  it('should display the username of the sender if different from connected user', () => {
    render(
      <Message
        message={messageSentByDonkey}
        contactUsername={contact}
        isSentByUser={user() === messageSentByDonkey.authorId}
      />,
    );

    expect(
      screen.getByText(/Donkey/),
      // @ts-ignore
    ).toBeInTheDocument();
  });

  it('should display differently if message is written by the connected user', () => {
    render(
      <Message
        message={messageSentByUser}
        contactUsername={contact}
        isSentByUser={user() === messageSentByUser.authorId}
      />,
    );
    const messageElement = document.querySelector('.Message');
    const hasModifier = messageElement.classList.contains('Message__from-logged-user');
    expect(hasModifier).toBeTruthy();
  });

  it('should not display differently if message is not written by connected user', () => {
    render(
      <Message
        message={messageSentByDonkey}
        contactUsername={contact}
        isSentByUser={user() === messageSentByDonkey.authorId}
      />,
    );
    const messageElement = document.querySelector('.Message');
    const hasModifier = messageElement.classList.contains('Message__from-logged-user');
    expect(hasModifier).toBeFalsy();
  });
});
