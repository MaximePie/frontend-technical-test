const express = require('express');
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
  const formatedId = parseInt(id, 10);
  let conversations = store.get('conversations');
  if (!conversations) {
    conversations = [];
  }
  const targetConversation = conversations.find((conversation) => conversation.id === formatedId);
  response.json(targetConversation);
});

/**
 * Creating a new conversation
 */
router.post('/:userId', (request, response) => {
  const { conversation } = request.fields;
  const currentConversations = store.get('conversations') ?? [];
  conversation.id = currentConversations[currentConversations.length - 1].id + 1;

  store.set('conversations', [...currentConversations, conversation]);
  response.json(conversation);
});

/**
 * Get conversations, possibly from user's Id
 * If there are no conversation in the base, return an empty array
 * @param userId
 */
function getConversationsForUser(userId) {
  const conversations = store.get('conversations');
  const formatedUserId = parseInt(userId, 10);
  if (!conversations || !conversations.length) {
    return [];
  }

  return conversations.filter(
    ({ senderId, recipientId }) => senderId === formatedUserId || recipientId === formatedUserId,
  );
}

module.exports = router;
