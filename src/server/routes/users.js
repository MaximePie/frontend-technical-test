const express = require('express');
const Router = require('router');
const store = require('store2');
const db = require('../db.json');

const router = express.Router();

router.get('/', (request, response) => {
  let users = store.get('users');
  if (!users) {
    users = [];
  }
  response.json(users);
});

/**
 * Creates 4 users
 * It will initialize the whole database based on the json db file
 */
router.get('/create', (request, response) => {
  const users = [];
  store.remove('users');
  store.remove('conversations');
  store.remove('messages');
  store.set('users', db.users);
  store.set('conversations', db.conversations);
  store.set('messages', db.messages);

  response.json(db.users);
});

/**
 * Get info about one user
 */
router.get('/:id', (request, response) => {
  const { id } = request.params;
  const users = store.get('users');
  if (users) {
    let targetUser = users.find((user) => user.id === id);
    if (!targetUser) {
      targetUser = {};
    }
    response.json(targetUser);
  } else {
    response.json({ message: 'Sorry, no user could be found' });
  }
});

module.exports = router;
