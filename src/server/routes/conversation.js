const express = require('express');
const Router = require('router');
const store = require('store2');

const router = express.Router();

router.get('/:userId', (request, response) => {
  const { userId } = request.params;
  const userConversations = getConversationsForUser(userId);
  response.json(userConversations);
});

/**
 * Get a conversation by its ID
 */
router.get('/byId/:id', (request, response) => {
  const { id } = request.params;
  let conversations = store.get('conversations');
  if (!conversations) {
    conversations = [];
  }
  const targetConversation = conversations.find((conversation) => conversation.id === id);
  response.json(targetConversation);
});

/**
 * Creating a new conversation
 */
router.post('/:userId', (request, response) => {
  const { conversation } = request.params;
  const currentConversations = store.get('conversations');
  let updatedConversations = currentConversations;
  let lastConversationId = null;

  if (!updatedConversations) {
    updatedConversations = [];
    lastConversationId = -1;
  } else {
    lastConversationId = updatedConversations[updatedConversations.length].id;
  }

  updatedConversations.push({
    ...conversation,
    id: lastConversationId + 1,
  });

  store.set('conversations', updatedConversations);
  response.json(conversation);
});

/**
 * Get conversations, possibly from user's Id
 * If there are no conversation in the base, return an empty array
 * @param userId
 */
function getConversationsForUser(userId) {
  const conversations = store.get('conversations');
  if (!conversations || !conversations.length) {
    return [];
  }

  return conversations.filter(
    (conversation) => (
      conversations.senderId === userId
        || conversations.recipientId === userId
    ),
  );
}

module.exports = router;
