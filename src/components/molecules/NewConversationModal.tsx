import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useRouter } from 'next/router';
import { User } from '../../types/user';
import APIManager from '../../server/APIManager';
import Routes from '../../utils/routes';
import { userContext } from '../../contexts/UserContext';
import UserCard from './UserCard';
import { PostedConversation } from '../../types/conversation';

library.add(faXmark);

interface NewConversationModalProps {
  isOpen: boolean,
  onClose: Function,
  alreadyContactedUserIds: number[]
}

if (document) {
  const appElement = document.getElementById('__next');
  if (appElement) {
    Modal.setAppElement('#__next');
  }
}

export default function NewConversationModal(props: NewConversationModalProps) {
  const router = useRouter();

  const { isOpen, onClose, alreadyContactedUserIds } = props;
  const { id: userId } = useContext(userContext);

  const [users, setUsers] = useState<User[]>([]);

  const newContactsList: User[] = newContacts();

  return (
    <Modal isOpen={isOpen} onAfterOpen={fetchUsers} className="NewConversationModal">
      <div className="NewConversationModal">
        <div className="NewConversationModal__header">
          <h3 className="NewConversationModal__header-text">Want to start a new conversation? Select a user!</h3>
          <FontAwesomeIcon
            className="NewConversation__header__close-icon"
            // @ts-ignore
            icon="fa-xmark"
            onClick={onCloseButtonClick}
          />
        </div>
        <div className="NewConversationModal__users">
          {!newContactsList.length && (
            <>
              <h4>Oops.</h4>
              <p>You are already talking to everyone. </p>
              <p>You cannot start a new conversation yet...</p>
            </>
          )}
          {newContactsList.length > 0 && newContactsList.map((user) => (
            <UserCard
              user={user}
              actionText="Start Chat"
              onActionClick={() => startNewConversation(user)}
            />
          ))}
        </div>
      </div>
    </Modal>
  );

  /**
   * Start a new conversation with the selected User
   * Then redirect the user to the appropriate conversation page
   */
  function startNewConversation({ id, nickname }: User) {
    APIManager.getFromServer(`${Routes.USERS}/${userId}`).then((response) => {
      const newConversation: PostedConversation = {
        lastMessageTimestamp: moment().unix().toString(),
        senderId: userId,
        recipientId: id,
        recipientNickname: nickname,
        senderNickname: response.data.nickname,
      };

      APIManager.postOnServer(
        `${Routes.CONVERSATIONS}/${userId}`,
        { conversation: newConversation },
      )
        .then(async (newConversationResponse) => {
          if (newConversationResponse.data) {
            const { id: newConversationId } = newConversationResponse.data;
            router.push(`${Routes.CONVERSATION}/${newConversationId}`);
          }
        });
    });
  }

  /**
   * Filters the users map to only retrieve the new contacts
   * The User cannot start a conversation with himself!
   * @return User[] a list of new users that the logged in user has not contacted yet.
   */
  function newContacts(): User[] {
    return users.filter((user) => !alreadyContactedUserIds.includes(user.id) && user.id !== userId);
  }

  /**
   * Close the modal by calling the props onClose method
   */
  function onCloseButtonClick() {
    onClose();
  }

  /**
   * Fetch the users and set the users state
   */
  function fetchUsers() {
    APIManager.getFromServer(Routes.USERS).then((response) => {
      if (response.data) {
        setUsers(response.data);
      }
    });
  }
}
