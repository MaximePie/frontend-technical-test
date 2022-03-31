import React from 'react';
import moment from 'moment';
import Avatar from 'react-avatar';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Conversation } from '../../types/conversation';

interface ConversationInListProps {
  conversation: Conversation,
  connectedUserId: number,
}

export default function ConversationInList(props: ConversationInListProps) {
  const { conversation, connectedUserId } = props;
  const router = useRouter();

  const {
    senderId,
    recipientNickname,
    senderNickname,
    lastMessageTimestamp,
  } = conversation;

  const contactUsername = username();

  return (
    <Link href="/conversation/[id]" as={`/conversation/${conversation.id}`}>
      <div className="ConversationInList">
        <Avatar
          name={contactUsername}
          alt={contactUsername}
          round="100px"
          size="50px"
        />
        <div className="ConversationInList__details">
          <div className="ConversationInList__recipientNickname">{contactUsername}</div>
          <div className="ConversationInList__date">{date()}</div>
        </div>
      </div>
    </Link>
  );

  /**
   * Opens the conversation page associated to this conversation ID
   */
  function openConversation(): void {
    router.push('/conversation/[id]', `/conversation/${conversation.id}`);
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
    const date = new Date(parseInt(lastMessageTimestamp, 10) * 1000);
    return moment(date).format('MMM D');
  }
}
