import React, { useEffect, useState } from 'react';
import type { Conversation } from '../types/conversation';

export default function Conversations() {
  useEffect(loadConversations, []);

  // This is the list of all conversations
  const [conversations, setConversations] = useState<Conversation[]>([]);

  return (
    <div className="Conversations">
      <h4>Conversations</h4>
      {conversations.map((conversation) => (
        <div>{JSON.stringify(conversation)}</div>
      ))}
    </div>
  );

  /**
   * Fetch the conversations from the Database
   * And display it on the page once it's done.
   */
  function loadConversations(): void {
    const userId: number = 1;
    fetch(`http://localhost:3005/conversations/${userId}`)
      .then((response) => response.json())
      .then((conversations: Conversation[]) => {
        setConversations(conversations);
      });
  }
}
