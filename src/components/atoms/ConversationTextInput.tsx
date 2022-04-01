import React, { useState, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

library.add(faPaperPlane);

interface ConversationTextInputProps {
  onMessageSend: Function
}

export default function ConversationTextInput({ onMessageSend }: ConversationTextInputProps) {
  const [messageText, setMessageText] = useState<string>('');

  return (
    <div className="ConversationTextInput">
      <form
        onSubmit={handleSend}
        className="ConversationTextInput__form"
      >
        <input
          placeholder="Send Message"
          type="text"
          onChange={handleMessageUpdate}
          value={messageText}
          className="ConversationTextInput__input"
        />
        <button
          type="submit"
          className="ConversationTextInput__submit"
        >
          <FontAwesomeIcon icon="paper-plane" />
        </button>
      </form>
    </div>
  );

  /**
   * Removes the content of the input
   * Then calls onMessageSend method
   *
   * @event Event The form submission event
   */
  function handleSend(event) {
    event.preventDefault();
    onMessageSend(messageText);
    setMessageText('');
  }

  /**
   * Update the messageText state with the new event target value
   * @param event - The event containing the target value we need to update the state
   */
  function handleMessageUpdate(event: ChangeEvent<HTMLInputElement>) {
    setMessageText(event.target.value);
  }
}
