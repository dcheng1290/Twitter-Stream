const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const db = require('../db/twitter/index.js');
const Twitter = require('./twitter');

const streamTwitter = Twitter;
const Sentiment = require('./sentiment.js');

const PORT = process.env.port || 3333;

const app = express();

app.use(express.static(path.join(`${__dirname}/../public/dist`)));
const server = app.listen(PORT);
console.log(`Listening on port ${PORT}`);

const io = require('socket.io').listen(server);

const connections = [];

io.sockets.on('connection', (socket) => {
  console.log('A client is connected');

  let prevSearch = false;
  let streamTwitter;

  // keyword provided from SearchForm.jsx on 'search'
  socket.on('search', (msg) => {
    console.log(`keyword ${msg.keyword}`);

    if (prevSearch) {
      streamTwitter.stop();
    } else {
      prevSearch = true;
    }
    // track: searches based on the keyword
    streamTwitter = Twitter.stream('statuses/filter', { track: msg.keyword });
    streamTwitter.on('tweet', (tweet) => {
      console.log(tweet.text);

      socket.emit('sendMessage', { tweet: Sentiment.getTweets(tweet) });
      // save into mongo DB every time a tweet comes in
      db.save(Sentiment.getTweets(tweet));
    });

    socket.once('disconnect', () => {
      connections.splice(connections.indexOf(socket), 1);
      socket.disconnect();
      streamTwitter.stop();
    });
  });
});

module.exports = app;
