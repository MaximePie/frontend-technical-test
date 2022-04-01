const express = require('express');
const Router = require('router');

const router = express.Router();

router.get('/', (request, response) => {
  response.json({ haha: 'haha' });
});

module.exports = router;
