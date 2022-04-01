import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getLoggedUserId } from '../../utils/getLoggedUserId';
import Layout from '../../components/layouts/layout';
import ConversationHeader from '../../components/molecules/ConversationHeader';
import type { Conversation as ConversationType } from '../../types/conversation';
import type { Message as MessageType } from '../../types/message';

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
      </div>
    </Layout>
  );

  /**
   * Fetch the details from the conversation according to the user ID.
   * Fetch the messages from the conversation ID
   * Sets the state of the conversation after the request has been completed
   */
  function fetchConversationInfo() {
    axios.get(`http://localhost:3005/conversations/${getLoggedUserId()}`)
      .then((response) => {
        const currentConversation = response.data.find(
          (userConversation) => userConversation.id === parseInt(id, 10),
        );

        setConversation(currentConversation);
      });

    axios.get(`http://localhost:3005/messages/${id}`)
      .then((response) => setMessages(response.data));
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
}
