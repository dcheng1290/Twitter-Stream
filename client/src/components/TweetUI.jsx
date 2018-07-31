import React from 'react';
import SentimentChart from './SentimentChart.jsx';

class TweetUI extends React.Component {
  render() {
    let {
      totalTweets,
      sentiment,
      posArray,
      negArray,
      neutArray,
    } = this.props;
    return (
      <div className="dashboard col-sm-8">
        <SentimentChart
          totalTweets={totalTweets}
          sentiment={sentiment}
          posArray={posArray}
          negArray={negArray}
          neutArray={neutArray}
        />
      </div>
    );
  }
}

export default TweetUI;
