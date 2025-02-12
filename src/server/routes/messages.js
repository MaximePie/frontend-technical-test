const express = require('express');
const Router = require('router');
const store = require('store2');
const db = require('../db.json');

const router = express.Router();

router.get('/:conversationId', (request, response) => {
  const { conversationId } = request.params;
  const formatedConversationId = parseInt(conversationId, 10);
  let messagesFromDatabase = store.get('messages');
  if (!messagesFromDatabase) {
    messagesFromDatabase = [];
  }

  const messagesForConversation = messagesFromDatabase.filter(
    (message) => message.conversationId === formatedConversationId,
  );

  response.json(messagesForConversation);
});

router.post('/:conversationId', (request, response) => {
  const { conversationId } = request.params;
  const formatedConversationId = parseInt(conversationId, 10);
  const { newMessage } = request.fields;
  const currentMessages = store.get('messages') ?? [];
  newMessage.id = currentMessages[currentMessages.length - 1].id + 1;

  const updatedMessages = [...currentMessages, { ...newMessage }];
  store.set('messages', updatedMessages);

  // Updating conversation latest timestamp
  const storedConversations = store.get('conversations');
  const storedConversation = storedConversations.find(
    ({ id: storedId }) => storedId === formatedConversationId,
  );

  const updatedConversation = {
    ...storedConversation,
    lastMessageTimestamp: Math.floor(new Date().getTime() / 1000),
  };

  const updatedConversations = storedConversations.map(
    (conversation) => (
      conversation.id !== formatedConversationId
        ? conversation
        : updatedConversation
    ),
  );

  store.set('conversations', updatedConversations);

  response.json({ newMessage, updatedConversations, updatedConversation });
});

module.exports = router;
