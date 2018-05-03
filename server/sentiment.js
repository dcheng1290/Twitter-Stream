const Sentiment = require('sentiment');
const sentiment = new Sentiment;

sentiment.getTweets = function (tweet, socket) {
  // define var for incoming texts
  const sentimentText = Sentiment(tweet.text);
  if (sentimentText.score < 0) {
    sentimentText = 'negative';
  } else if (sentimentText.score > 0) {
    sentimentText = 'positive';
  } else {
    sentimentText = 'neutral';
  }
  return sentimentText;
  console.log('score hi');
};

console.log('sentiment');

module.exports = sentiment;