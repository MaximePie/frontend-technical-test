import React, { useState, ChangeEvent } from 'react';

interface ConversationTextInputProps {
  onMessageSend: Function
}

export default function ConversationTextInput({ onMessageSend }: ConversationTextInputProps) {
  const [messageText, setMessageText] = useState<string>('');

  return (
    <form
      className="ConversationTextInput"
      onSubmit={handleSend}
    >
      <input type="text" onChange={handleMessageUpdate} value={messageText} />
      <button type="submit">{'>'}</button>
    </form>
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
