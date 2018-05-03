'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const db = require('../db');
const Twitter = require('./twitter');


const PORT = process.env.port || 3000;

const app = express();
app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
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

// Create Server and Socket.io Instance
const server = app.listen(PORT);
console.log(`Listening on port ${PORT}`)

// Creating socket connection with client and add all socket events/listeners here
const io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
  console.log('A client is connected');

  let streamTwitter;

  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);
    
    // Streaming endpoint 
    streamTwitter = Twitter.stream('statuses/filter');

    // Turns on the stream
    streamTwitter.on('tweet', function (tweet) {
      console.log(tweet);
      
      // produce a message/event to socket/client
      socket.emit('', 'an event');
    });

    socket.once('disconnect', function () {

      // disconnect socket and twitter stream
      socket.disconnect();
      streamTwitter.stop();

      console.log('Socket disconnected');
    });
  });
});


module.exports = app;
