const db = require('../db.json');

// Need this middleware to catch some requests
// and return both conversations where userId is sender or recipient
module.exports = (req, res, next) => {
  if (/conversations/.test(req.url) && req.method === 'GET') {
    const userId = req.query?.senderId;
    const id = req.query?.id;

    let result = [];
    if (userId) {
      result = db?.conversations?.filter(
        (conv) => conv.senderId == userId || conv.recipientId == userId,
      );
    } else if (id) {
      result = db?.conversations?.filter(
        (conv) => conv.id == id,
      );
    }

    res.status(200).json(result);
    return;
  }

  next();
};
