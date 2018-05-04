import { Z_FILTERED } from 'zlib';

const Sentiment = require('sentiment');
const sentiment = new Sentiment;

sentiment.getTweets = (tweet, socket) => {
  // define incoming tweets and analyze it 
  let sentimentText = sentiment.analyze(tweet.text);

  // 
  if (sentimentText.score > 0) {
    sentimentText = 'Positive';
  } else if (sentimentText.score < 0) {
    sentimentText = 'Negative';
  } else {
    sentimentText = 'Neutral';
  }
  return sentiment.storeTweets(tweet, sentimentText, socket);
  console.log('sentiment data ' + sentimentText);
};

sentiment.storeTweets = (tweet, sentimentText, socket) => {
  let tweetInfo = {
    created_at: tweet.created_at,
    tweet_id: tweet.id_str,
    text: tweet.text,
    user: {
      username: tweet.user.name,
      profile_image_url: tweet.user.profile_image_url,
    },
  };
};


module.exports = sentiment;


