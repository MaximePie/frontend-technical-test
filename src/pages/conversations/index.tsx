import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import type { Conversation } from '../../types/conversation';
import ConversationInList from '../../components/molecules/ConversationInList';
import Layout from '../../components/layouts/layout';
import APIManager from '../../server/APIManager';
import Routes from '../../utils/routes';
import { userContext } from '../../contexts/UserContext';

library.add(faArrowRightFromBracket);

export default function Index() {
  useEffect(loadConversations, []);

  const { id: connectedUserId, logout } = useContext(userContext);

  // This is the list of all conversations
  const [conversations, setConversations] = useState<Conversation[]>([]);

  return (
    <Layout>
      <div className="Conversations">
        <div className="Conversations__header">
          <h4>Conversations</h4>
          <FontAwesomeIcon
            // @ts-ignore
            onClick={logout}
            className="Conversations__logout"
            // @ts-ignore
            icon="fa-solid fa-arrow-right-from-bracket"
          />
        </div>
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
    APIManager.getFromServer(`${Routes.CONVERSATIONS}/${connectedUserId}`).then((response) => {
      const conversationsList: Conversation[] = response.data;
      setConversations(conversationsList);
    });
  }
}
