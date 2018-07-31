const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/twitter';
// const mongoUri = 'mongodb://172.17.0.2/davidcheng1290';
const db = mongoose.connect(mongoUri);
mongoose.Promise = global.Promise;

const Tweet = new mongoose.Schema({
  created_at: String,
  sentiment: String,
  name: String,
  username: String,
  location: String,
  timezone: String,
  profile_image_url: String,
  tweet_id: Number,
  text: String,
  timestamp: Number,
});

const Tweets = mongoose.model('tweet', Tweet);

const save = (tweet) => {
  return new Promise((resolve, reject) => {
    const tweetObj = {};
    tweetObj.tweet_id = tweet.tweet_id;
    tweetObj.text = tweet.text;
    tweetObj.name = tweet.user.name;
    tweetObj.sentiment = tweet.sentiment;
    tweetObj.username = tweet.user.username;
    tweetObj.created_at = tweet.created_at;
    const newTweet = new Tweets(tweetObj);
    newTweet.save((err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};


module.exports.Tweets = Tweets;
module.exports.save = save;
