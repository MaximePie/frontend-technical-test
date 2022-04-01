import React from 'react';
import {
  describe, expect, it,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import moment from 'moment';
import { Conversation as ConversationType } from '../types/conversation';
import ConversationInList from '../components/molecules/ConversationInList';
import { getLoggedUserId } from '../utils/getLoggedUserId';
import ConversationHeader from '../components/molecules/ConversationHeader';

const conversationStartedByUser: ConversationType = {
  id: 1,
  recipientId: 2,
  recipientNickname: 'Jeremie',
  senderId: 1,
  senderNickname: 'Thibaut',
  lastMessageTimestamp: '1648544776',
};

const conversationStartedByContact: ConversationType = {
  id: 2,
  recipientId: 3,
  recipientNickname: 'Patrick',
  senderId: 1,
  senderNickname: 'Thibaut',
  lastMessageTimestamp: '1620284667',
};

const conversationWithLastAnswerToday: ConversationType = {
  id: 3,
  recipientId: 3,
  recipientNickname: 'Patrick',
  senderId: 1,
  senderNickname: 'Thibaut',
  lastMessageTimestamp: moment().unix().toString(),
};

describe('Conversation Header', () => {
  it('should display the correctly formated date', () => {
    const connectedUserId = getLoggedUserId();
    const {
      lastMessageTimestamp, senderId, recipientNickname, senderNickname,
    } = conversationStartedByUser;
    render(
      <ConversationHeader
        lastMessageDate={lastMessageTimestamp}
        usernames={connectedUserId === senderId ? recipientNickname : senderNickname}
      />,
    );

    expect(
      screen.getByText(/Mar 29 at 11:06 am/),
      // @ts-ignore
    ).toBeInTheDocument();
  });

  it("should display 'today' is the last message has been sent on the same day as today", () => {
    const connectedUserId = getLoggedUserId();
    const {
      lastMessageTimestamp, senderId, recipientNickname, senderNickname,
    } = conversationWithLastAnswerToday;

    render(
      <ConversationHeader
        lastMessageDate={lastMessageTimestamp}
        usernames={connectedUserId === senderId ? recipientNickname : senderNickname}
      />,
    );

    expect(
      screen.getByText(/today/),
      // @ts-ignore
    ).toBeInTheDocument();
  });
});
