import React, { Component } from 'react';
import io from 'socket.io-client';
import moment from 'moment-timezone';
import Header from './Header.jsx';  
import Data from './Data.jsx';
import Footer from './Footer.jsx';
import TimeSeries from './TimeSeries.jsx';

/* 
  look into adding props validation
  separate concerns - move component logic out of app
  pull search out of header -- put into own search component
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTweets: [],
      chartArray: [],
      posArray: [],
      negArray: [],
      neutArray: [],
      totalTweets: {
        total: 0,
        posTotal: 0,
        negTotal: 0,
        neutTotal: 0,
      },
      searchStatus: false,
      initTimestamp: '',
      sentiment: 'Neutral',
    };

    this.emit = this.emit.bind(this);
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.initTimestamp = this.initTimestamp.bind(this);
  }

  connect() { // connect to socket
    this.setState({ status: 'connected' });
  }
  
  disconnect() { // disconnect from socket
    this.setState({ status: 'disconnected' });
    console.log('Disconnected');
  }
  
  componentWillMount() { // connect to server when rendered
    this.socket = io.connect();
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);

    const user = this;
    this.socket.on('sendMessage', (tweetInfo) => { // send to client to get back tweet data
      user.getTweet(tweetInfo.tweet);
    });
  }

  initTimestamp(timestamp) {
    this.setState({ initTimestamp: timestamp.initTimestamp });
    this.setState({ search: true });
  }

  getTweet(tweet) {
    let {
      currentTweets,
      totalTweets,
      chartArray,
      posArray,
      negArray,
      neutArray,
    } = this.state;

    let coeff = 1000 * 60; 
    let roundedTime = Math.round(Number(tweet.timestamp) / coeff) * coeff; // round time 
    let updatedChart = [...chartArray, [roundedTime, totalTweets.posTotal]];
    let updatedNeut = [...neutArray, [roundedTime, totalTweets.neutTotal]];
    let updatedNeg = [...negArray, [roundedTime, totalTweets.negTotal]];
    let updatedTweets = [tweet, ...currentTweets];
    
    this.setState({
      currentTweets: updatedTweets,
      chartArray: updatedChart,
      neutArray: updatedNeut,
      negArray: updatedNeg,
    });
    this.incrementSentimentCount(tweet.sentiment);
    this.binTweets(tweet.timestamp, tweet.sentiment);
    // this.updateChartPoint(tweet.sentiment, tweet.timestamp);
    this.overallSentiment();
  }

  emit(eventName, keyword) {
    this.socket.emit(eventName, keyword);
    this.setState({
      searchStatus: true,
      currentTweets: [],
      totalTweets: {
        total: 0,
        posTotal: 0,
        neutTotal: 0,
        negTotal: 0,
      },
    });
  }

  incrementSentimentCount(sentiment) {
    const { totalTweets } = this.state;
    const newTotal = totalTweets;
    if (sentiment === 'Positive') {
      totalTweets.posTotal += 1;
      totalTweets.total += 1;
      this.setState({ totalTweets: newTotal });
    } else if (sentiment === 'Negative') {
      totalTweets.negTotal += 1;
      totalTweets.total += 1;
      this.setState({ totalTweets: newTotal });
    } else {
      totalTweets.neutTotal += 1;
      totalTweets.total += 1;
      this.setState({ totalTweets: newTotal });
    }
  }

  
  overallSentiment() {
    let { totalTweets: { negTotal, posTotal } } = this.state;
    let totalTweets = posTotal + negTotal;
    let posTweets = posTotal;
    let sentiment = posTweets / totalTweets;
    if (sentiment < 0.5) {
      this.setState({ sentiment: 'Negative' });
    } else if (sentiment > 0.5) {
      this.setState({ sentiment: 'Positive' });
    } else {
      this.setState({ sentiment: 'Neutral' });
    }
  }

  render() {
    let { 
      currentTweets, 
      totalTweets, 
      sentiment, 
      chartArray, 
      posArray, 
      negArray, 
      neutArray 
    } = this.state;
    // console.log(JSON.parse(JSON.stringify(this.state.binnedTweets)));
    return (
      <div>
        <Header
          emit={this.emit}
          initTimestamp={this.initTimestamp} />
        {this.state.search ? <Data
          currentTweets={currentTweets}
          totalTweets={totalTweets}
          sentiment={sentiment}
          chartArray={chartArray}
          posArray={posArray}
          negArray={negArray}
          neutArray={neutArray}
        /> : null}
      </div>
    );
  }
}

export default App;

