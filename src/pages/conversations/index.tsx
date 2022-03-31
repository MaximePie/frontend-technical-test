import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { Conversation } from '../../types/conversation';
import ConversationInList from '../../components/molecules/ConversationInList';
import Layout from '../../components/layouts/layout';

const connectedUserId: number = 1;

export default function Index() {
  useEffect(loadConversations, []);

  // This is the list of all conversations
  const [conversations, setConversations] = useState<Conversation[]>([]);

  return (
    <Layout>
      <div className="Conversations">
        <h4>Index</h4>
        {conversations.map((conversation) => (
          <div>
            <ConversationInList
              conversation={conversation}
              key={conversation.id}
              connectedUserId={connectedUserId}
            />
          </div>
        ))}
      </div>
    </Layout>
  );

  /**
   * Fetch the conversations from the Database
   * And display it on the page once it's done.
   */
  function loadConversations(): void {
    axios.get(`http://localhost:3005/conversations/${connectedUserId}`)
      .then((response) => {
        const conversationsList: Conversation[] = response.data;
        setConversations(conversationsList);
      });
  }
}
