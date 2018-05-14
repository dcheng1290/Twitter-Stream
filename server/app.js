'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const db = require('../db');
const Twitter = require('./twitter');
const streamTwitter = Twitter;
const Sentiment = require('./sentiment.js');



const PORT = process.env.port || 3000;

const app = express();
// app.use(middleware.morgan('dev'));
// app.use(middleware.cookieParser());
// app.use(middleware.bodyParser.urlencoded({extended: false}));
// app.use(middleware.bodyParser.json());
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(middleware.auth.session);
// app.use(middleware.passport.initialize());
// app.use(middleware.passport.session());
// app.use(middleware.flash());


app.use(express.static(path.join(__dirname + '/../public/dist')));
// app.use(express.static(path.join(__dirname, '../public')));

// app.use('/', routes.auth);
// app.use('/api', routes.api);
// app.use('/api/profiles', routes.profiles);


const server = app.listen(PORT);
console.log(`Listening on port ${PORT}`);

// Creating socket connection with client and add all socket events/listeners here
const io = require('socket.io').listen(server);

const connections = [];

io.sockets.on('connection', (socket) => {
  console.log('A client is connected');

  let prevSearch = false;
  let streamTwitter;

  // keyword provided from SearchForm.jsx on 'search'
  socket.on('search', (msg) => {
    console.log('keyword ' + msg.keyword);
    
    if (prevSearch) {
      streamTwitter.stop();
    } else {
      prevSearch = true;
    }
    // track: searches based on the keyword
    streamTwitter = Twitter.stream('statuses/filter', { track: msg.keyword });

    // Turns on the stream on 'tweet' and includes the entire tweet information
    streamTwitter.on('tweet', (tweet) => {
      console.log(tweet.text);
      
      // As the message comes in, get sentiment data and send back to client
      socket.emit('sendMessage', { tweet: Sentiment.getTweets(tweet) });
    });

    socket.once('disconnect', () => {
      connections.splice(connections.indexOf(socket), 1);
      socket.disconnect();
      streamTwitter.stop();
      console.log('Socket disconnected: %s sockets remaining', connections.length);
    });
  });
});


module.exports = app;
