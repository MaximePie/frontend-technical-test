import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Avatar from 'react-avatar';
import Link from 'next/link';
import { Conversation } from '../../types/conversation';
import APIManager from '../../server/APIManager';
import Routes from '../../utils/routes';

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
    recipientId,
  } = conversation;

  const [contactImage, setContactImage] = useState<string>('');
  useEffect(fetchContactImage, []);

  const contactUsername = username();

  return (
    <Link href={{
      pathname: '/conversation/[id]',
      query: { id: conversation.id },
    }}
    >
      <div className="ConversationInList">
        <Avatar
          name={contactUsername}
          alt={contactUsername}
          round="100px"
          size="50px"
          src={contactImage}
        />
        <div className="ConversationInList__details">
          <p className="ConversationInList__recipientNickname">{contactUsername}</p>
          <p className="ConversationInList__date">{date()}</p>
        </div>
      </div>
    </Link>
  );

  /**
   * Fetch contact ID
   */
  function fetchContactImage(): void {
    const contactUserId = senderId === connectedUserId ? recipientId : senderId;
    APIManager.getFromServer(`${Routes.USERS}/${contactUserId}`).then((response) => {
      setContactImage(response.data.image);
    });
  }

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
    const initialDate = new Date(parseInt(lastMessageTimestamp, 10) * 1000);
    return moment(initialDate).format('MMM D');
  }
}
