import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import moment from 'moment';
import ConversationInList from '../components/molecules/ConversationInList';
import { Conversation } from '../types/conversation';
import { getLoggedUserId } from '../utils/getLoggedUserId';

const conversationStartedByUser: Conversation = {
  id: 1,
  senderId: 1,
  senderNickname: 'Mark',
  recipientId: 2,
  recipientNickname: 'Camilla',
  lastMessageTimestamp: '1620284667',
};

const conversationStartedByContact: Conversation = {
  id: 2,
  recipientId: 1,
  recipientNickname: 'Mark',
  senderId: 2,
  senderNickname: 'Camilla',
  lastMessageTimestamp: '1625637849',
};

describe('Conversation in List', () => {
  it('should render the appropriate Avatar Letter', () => {
    render(
      <ConversationInList
        conversation={conversationStartedByUser}
        connectedUserId={getLoggedUserId()}
      />,
    );
    const expectedInitial = conversationStartedByUser.recipientNickname;
    const avatar = document.querySelector('.sb-avatar__text');

    // @ts-ignore
    expect(avatar.title).toBe(expectedInitial);
  });

  it('should render the name of the contact if the author is the connected user', () => {
    const conversation = conversationStartedByUser;
    render(
      <ConversationInList
        conversation={conversation}
        connectedUserId={getLoggedUserId()}
      />,
    );

    const expectedContactName = conversation.recipientNickname;
    const actualContactName = document.querySelector('.ConversationInList__recipientNickname');
    expect(actualContactName.innerHTML).toBe(expectedContactName);
  });

  it('should render the name of the contact if the author is the contact', () => {
    const conversation = conversationStartedByContact;
    render(
      <ConversationInList
        conversation={conversation}
        connectedUserId={getLoggedUserId()}
      />,
    );

    const expectedContactName = conversation.senderNickname;
    const actualContactName = document.querySelector('.ConversationInList__recipientNickname');
    expect(actualContactName.innerHTML).toBe(expectedContactName);
  });

  it('should render the appropriate time', () => {
    const conversation = conversationStartedByContact;
    const expectedMoment = moment(new Date(parseInt(conversation.lastMessageTimestamp, 10) * 1000))
      .format('MMM D');
    render(
      <ConversationInList
        conversation={conversation}
        connectedUserId={getLoggedUserId()}
      />,
    );
    const actualTime = document.querySelector('.ConversationInList__date');
    expect(actualTime.innerHTML).toBe(expectedMoment);
  });
});
