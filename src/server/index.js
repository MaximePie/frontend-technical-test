const express = require('express');

const app = express();

const conversationsRoutes = require('./routes/conversation');

app.use('/conversation/', conversationsRoutes);

app.listen(process.env.PORT || 3005);
