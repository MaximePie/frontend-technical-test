import React, { useEffect, useState } from 'react';
import { getLoggedUserId } from '../../utils/getLoggedUserId';
import Layout from '../../components/layouts/layout';
import ConversationHeader from '../../components/molecules/ConversationHeader';
import Message from '../../components/atoms/Message';
import type { Conversation as ConversationType } from '../../types/conversation';
import type { Message as MessageType } from '../../types/message';
import APIManager from '../../server/APIManager';
import Routes from '../../utils/routes';

export async function getServerSideProps(context) {
  return {
    props: { query: context.query },
  };
}

interface ConversationProps {
  query: { id: string },
}

export default function Conversation(props: ConversationProps) {
  const { query } = props;
  const { id } = query;

  const [conversation, setConversation] = useState<ConversationType>();
  const [messages, setMessages] = useState<MessageType[]>();

  const {
    recipientNickname,
    senderNickname,
    lastMessageTimestamp,
    senderId,
  } = conversation || {};

  useEffect(fetchConversationInfo, []);

  return (
    <Layout>
      <div className="Conversation">
        <ConversationHeader
          usernames={conversationUsernames()}
          lastMessageDate={lastMessageTimestamp}
        />
        <div className="Conversation__messages">
          {sortedMessages().map((message: MessageType) => (
            <Message
              message={message}
              contactUsername={contactUsername()}
              isSentByUser={message.authorId === getLoggedUserId()}
              key={message.id}
            />
          ))}
        </div>
      </div>
    </Layout>
  );

  /**
   * Fetch the details from the conversation according to the user ID.
   * Fetch the messages from the conversation ID
   * Sets the state of the conversation after the request has been completed
   */
  function fetchConversationInfo() {
    APIManager.getFromServer(`${Routes.CONVERSATIONS}/${getLoggedUserId()}`)
      .then((response) => {
        const currentConversation = response.data.find(
          (userConversation) => userConversation.id === parseInt(id, 10),
        );

        setConversation(currentConversation);
      });

    APIManager.getFromServer(`${Routes.MESSAGES}/${id}`)
      .then((response) => setMessages(response.data));
  }

  /**
   * Sort the messages by chronological order
   *
   * @return MessageType[] the list of the sorted messagesa
   */
  function sortedMessages(): MessageType[] {
    let result = [];
    if (messages?.length) {
      result = messages.sort((messageA, messageB) => messageA.timestamp - messageB.timestamp);
    }
    return result;
  }

  /**
   * Generates the usernames in the correct order according
   * to the author of the conversation
   * Here, we replace the user's name by "You"
   * @return string The name of the author followed by the name of the contact
   */
  function conversationUsernames() {
    const isUserAuthor = senderId === getLoggedUserId();
    return isUserAuthor ? `You - ${recipientNickname}` : `${senderNickname} - You`;
  }

  /**
   * Get the username of the contact the logged user is talking with,
   * regardless of if the message is sent by the contact or by the user.
   */
  function contactUsername() {
    const isUserAuthor = senderId === getLoggedUserId();
    return isUserAuthor ? recipientNickname : senderNickname;
  }
}
