const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const conversationsRoutes = require('./routes/conversation');
const usersRoutes = require('./routes/users');

app.use('/conversations/', conversationsRoutes);
app.use('/users/', usersRoutes);

app.listen(process.env.PORT || 3005);
