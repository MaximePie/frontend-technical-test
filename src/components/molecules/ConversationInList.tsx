import React from 'react';
import moment from 'moment';
import { Conversation } from '../../types/conversation';
import Avatar from '../atoms/Avatar';

interface ConversationInListProps {
  conversation: Conversation,
  connectedUserId: number,
}

export default function ConversationInList(props: ConversationInListProps) {
  const { conversation, connectedUserId } = props;
  const {
    senderId,
    recipientNickname,
    senderNickname,
    lastMessageTimestamp,
  } = conversation;

  return (
    <div className="ConversationInList">
      <Avatar username={username()} />
      <div className="ConversationInList__details">
        <div className="ConversationInList__recipientNickname">{username()}</div>
        <div className="ConversationInList__date">{date()}</div>
      </div>
    </div>
  );

  /**
   * Return the contact's username.
   * If the author is the user, then we display the recipient's name.
   * Else, we display the author's name
   */
  function username(): string {
    return connectedUserId === senderId ? recipientNickname : senderNickname;
  }

  /**
   * Create a readable date from the timestamp and returns it
   */
  function date(): string {
    const date = new Date(parseInt(lastMessageTimestamp, 10) * 1000);
    return moment(date).format('MMM D');
  }
}