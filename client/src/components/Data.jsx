import React from 'react';
import StreamView from './StreamView.jsx';
import Dashboard from './Dashboard.jsx';

const Data = (props) => {
  let { 
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
      <Dashboard
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