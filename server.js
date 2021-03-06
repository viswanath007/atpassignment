import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import http from "http";
import socketio from "socket.io";

import serverConfig from './config';
import fetchTweets from "./data/fetchTweets";
import hashtagsSocket from "./data/hashtag.socket";

// Set native promises as mongoose promise
mongoose.Promise = global.Promise; 

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, { useNewUrlParser: true })
.then(
  () => {
    console.log("mongodb connected");
  },
  (error) => {
    if (error) {
      console.error('Failed to connect mongodb!');
      throw error;
    }
  }
);

// Initialize the Express App
const app = Express();
const server = http.createServer(app);
const io = socketio(server);

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, './client/public')));

// api routes

// socket
hashtagsSocket(app, io);

// fetch tweets and store in mongo
fetchTweets();

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'viswanath', lastName: 'reddy'},
    {id: 2, firstName: 'John', lastName: 'Doe'},
    {id: 3, firstName: 'Brad', lastName: 'Traversy'},
    {id: 4, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

const port = 5000;

server.listen(port, () => `Server running on port ${port}`);