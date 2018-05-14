const Sentiment = require('sentiment');
const sentiment = new Sentiment;

sentiment.getTweets = (tweet, socket) => {
  // define incoming tweets and analyze it
  let sentimentText = sentiment.analyze(tweet.text);

  if (sentimentText.score > 0) {
    sentimentText = 'Positive';
  } else if (sentimentText.score < 0) {
    sentimentText = 'Negative';
  } else {
    sentimentText = 'Neutral';
  }
  // return the object with stored properties back to app.js and back to client
  return sentiment.storeTweets(tweet, sentimentText, socket);
};

// this object will store the wanted properties from tweet and along with analyzed sentiment data
sentiment.storeTweets = (tweet, sentimentScore, socket) => {
  const tweetInfo = {
    created_at: tweet.created_at,
    sentiment: sentimentScore,
    tweet_id: tweet.id_str,
    text: tweet.text,
    timestamp: tweet.timestamp_ms, // needed for time series chart
    user: {
      name: tweet.user.name,
      username: tweet.user.screen_name,
      location: tweet.user.location,
      timezone: tweet.user.time_zone,
      created_at: tweet.user.created_at,
      profile_image_url: tweet.user.profile_image_url_https,
    },
  };
  return tweetInfo;
};


module.exports = sentiment;
