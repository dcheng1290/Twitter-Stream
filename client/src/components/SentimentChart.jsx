import React, {Component} from 'react';
import TimeSeries from './TimeSeries.jsx';

const SentimentChart = (props) => {
  const {
    totalTweets,
    posArray,
    negArray,
    neutArray,
    chartArray,
  } = props;
  const {
    total,
    posTotal,
    neutTotal,
    negTotal,
  } = totalTweets;
  return (
    <div className="twitter-activity">
      <h4>Sentiment Analysis (Tweets per 10 seconds)</h4>
      <TimeSeries
        posArray={posArray}
        negArray={negArray}
        neutArray={neutArray}
        chartArray={chartArray}
      />

      <div className="tweet-counters">
        <div className="total">
          <h3>Total</h3>
          <div className="total-tweets"></div>
          <div className="counter">{total}</div>
        </div>
        <div className="total">
          <h3>Positive</h3>
          <div className="total-positive"></div>
          <div className="counter">{posTotal}</div>
        </div>
        <div className="total">
          <h3>Neutral</h3>
          <div className="total-neutral"></div>
          <div className="counter">{neutTotal}</div>
        </div>
        <div className="total">
          <h3>Negative</h3>
          <div className="total-negative"></div>
          <div className="counter">{negTotal}</div>
        </div>
      </div>
      <div className="overall-sentiment">
        <h3>Overall Sentiment</h3>
        <p>{props.sentiment}</p>
      </div>
    </div>
  );
};

export default SentimentChart;
