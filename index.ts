import express = require('express');
import mongoose = require('mongoose');
import * as dotenv from 'dotenv';
dotenv.config();

// Create a new express application instance
const app: express.Application = express();
app.use(express.json());

// Import routes
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');

app.use('/posts', postsRoute);
app.use('/auth', authRoute);

// Routes
app.get('/', function (req, res) {
  res.send('Hello!');
});

// Connect to DB
mongoose.connect(
  process.env.DB_URL ?? '',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to db');
  }
);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
