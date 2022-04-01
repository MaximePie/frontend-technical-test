import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import type { Conversation } from '../../types/conversation';
import ConversationInList from '../../components/molecules/ConversationInList';
import NewConversationModal from '../../components/molecules/NewConversationModal';
import Layout from '../../components/layouts/layout';
import APIManager from '../../server/APIManager';
import Routes from '../../utils/routes';
import { userContext } from '../../contexts/UserContext';

library.add(faArrowRightFromBracket);

export default function Index() {
  const [isModalOpen, setModalOpenState] = useState<boolean>(false);

  useEffect(loadConversations, []);

  const { id: connectedUserId, logout } = useContext(userContext);

  // This is the list of all conversations
  const [conversations, setConversations] = useState<Conversation[]>([]);

  return (
    <Layout>
      <>
        <NewConversationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          alreadyContactedUserIds={contacts()}
        />
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
            <div key={conversation.id}>
              <ConversationInList
                conversation={conversation}
                key={conversation.id}
                connectedUserId={connectedUserId}
              />
            </div>
          ))}
          <div className="Conversations__bottom">
            <button
              className="Conversations__create"
              onClick={openModal}
            >
              Nouvelle conversation
            </button>
          </div>
        </div>
      </>
    </Layout>
  );

  /**
   * Returns the list of the ids of the users in contact with the logged  user.
   *
   * @return number[] a list of the user's ids in contact with the logged  user.
   */
  function contacts(): number[] {
    return conversations?.map(
      ({ recipientId, senderId }) => (connectedUserId === senderId ? recipientId : senderId),
    );
  }

  /**
   * Close the new conversation modal
   */
  function closeModal() {
    setModalOpenState(false);
  }

  /**
   * Open the new Conversation Modal
   */
  function openModal() {
    setModalOpenState(true);
  }

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
