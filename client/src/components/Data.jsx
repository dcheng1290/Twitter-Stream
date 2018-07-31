import React from 'react';
import StreamView from './StreamView.jsx';
import TweetUI from './TweetUI.jsx';

const Data = (props) => {
  const {
    currentTweets,
    totalTweets,
    sentiment,
    chartArray,
    posArray,
    negArray,
    neutArray,
  } = props;

  return (
    <div className="results container-fluid">
      <div className='row'>
      <StreamView currentTweets={currentTweets}/>
      <TweetUI
        totalTweets={totalTweets}
        sentiment={sentiment}
        chartArray={chartArray}
        posArray={posArray}
        negArray={negArray}
        neutArray={neutArray}
        />
      </div>
    </div>
  );
};

export default Data;
