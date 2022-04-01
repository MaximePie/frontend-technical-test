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
 */
router.get('/create', (request, response) => {
  const users = [];
  store.remove('users');
  store.set('users', db.users);

  response.json(db.users);
});

module.exports = router;
