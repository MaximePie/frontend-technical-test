const express = require('express');
const cors = require('cors');
const formidableMiddleware = require('express-formidable');

const app = express();
app.use(cors());
app.use(formidableMiddleware());

const conversationsRoutes = require('./routes/conversation');
const usersRoutes = require('./routes/users');
const messagesRoutes = require('./routes/messages');

app.use('/conversations/', conversationsRoutes);
app.use('/users/', usersRoutes);
app.use('/messages/', messagesRoutes);

app.listen(process.env.PORT || 3005);
