import React, { Component } from 'react';
import io from 'socket.io-client';
import moment from 'moment-timezone';
import Header from './Header.jsx';  
import Data from './Data.jsx';
import TimeSeries from './TimeSeries.jsx';
import HistoryChart from './HistoryChart.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    const coeff = 1000 * 10;
    const roundedTime = Math.round(Number(new Date().getTime() / coeff)) * coeff;
    this.state = {
      currentTweets: [],
      posArray: [[roundedTime, 0]],
      negArray: [[roundedTime, 0]],
      neutArray: [[roundedTime, 0]],
      totalTweets: {
        total: 0,
        posTotal: 0,
        negTotal: 0,
        neutTotal: 0,
      },
      image: ['https://farm4.staticflickr.com/3928/33137499263_37938c1387_k.jpg',
        'https://drscdn.500px.org/photo/133812917/m%3D900/v2?webp=true&sig=d854c6ebc690529299c5def2911d11247a152bac26b96069fc9c962470474335',
        'https://drscdn.500px.org/photo/121710303/m%3D900/v2?webp=true&sig=7bb04e89ebe560f2da3d7a2556827803fcc1892638e06e3069e461f3d3dfd5a6',
        'https://drscdn.500px.org/photo/126001591/m%3D900/v2?webp=true&sig=6f93a7f076ab9079afab78b631a1ca731f7a1ec562e1900fb811796bc6c030f0',
        'https://drscdn.500px.org/photo/110422883/m%3D900/v2?webp=true&sig=e65157872cc16434b3bf3371a082c11771393a0b351569c23e463d3f12a3df44',
      ],
      searchStatus: false,
      sentiment: 'Neutral',
    };
    this.emit = this.emit.bind(this);
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  connect() { // connect to socket
    this.setState({ status: 'connected' });
  }

  disconnect() { // disconnect from socket
    this.setState({ status: 'disconnected' });
    console.log('Disconnected');
  }

  componentDidMount() { // connect to server when rendered
    document.body.style.backgroundImage = `url(${this.state.image[Math.floor(Math.random() * 4)]})`;
    this.socket = io.connect();
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    const user = this;
    this.socket.on('sendMessage', (tweetInfo) => { // send to client to get back tweet data
      user.getTweet(tweetInfo.tweet);
    });
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
  
  getTweet(tweet) {
    const { currentTweets } = this.state;
    const updatedTweets = [tweet, ...currentTweets];
    this.setState({
      currentTweets: updatedTweets,
    });
    this.incrementSentimentCount(tweet.sentiment);
    this.updatePosChart(tweet.timestamp, tweet.sentiment);
    this.updateNegChart(tweet.timestamp, tweet.sentiment);
    this.updateNeutChart(tweet.timestamp, tweet.sentiment);
    this.overallSentiment();
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

  updatePosChart(timestamp, sentiment) {
    const { posArray } = this.state;
    let updatedPos = posArray;
    let binIndex = posArray.length - 1;
    let currentTime = posArray[binIndex][0];
    let coeff = 1000 * 10;
    let roundedTime = Math.round(Number(timestamp / coeff)) * coeff;
    if (roundedTime < (currentTime + 10000)) {
      if (sentiment === 'Positive') {
        updatedPos[binIndex][1] += 1;
        this.setState({ posArray: updatedPos });
      }
    } else {
      if (sentiment === 'Positive') {
        updatedPos = [...posArray, [roundedTime, 1]];
        this.setState({ posArray: updatedPos });
      } else {
        updatedPos = [...posArray, [roundedTime, 0]];
        this.setState({ posArray: updatedPos });
      }
    }
  }

  updateNeutChart(timestamp, sentiment) {
    const { neutArray } = this.state;
    let updatedNeut = neutArray;
    let binIndex = neutArray.length - 1;
    let currentTime = neutArray[binIndex][0];
    let coeff = 1000 * 10;
    let roundedTime = Math.round(Number(timestamp / coeff)) * coeff;
    if (roundedTime < (currentTime + 10000)) {
      if (sentiment === 'Neutral') {
        updatedNeut[binIndex][1] += 1;
        this.setState({ neutArray: updatedNeut });
      }
    } else if (sentiment === 'Neutral') {
      updatedNeut = [...neutArray, [roundedTime, 1]];
      this.setState({ neutArray: updatedNeut }); 
    } else if (updatedNeut.length > 3) {
      updatedNeut = [...neutArray.slice(0, 1), [roundedTime, 0]];
      this.setState({ neutArray: updatedNeut });
    } else {
      updatedNeut = [...neutArray, [roundedTime, 0]];
      this.setState({ neutArray: updatedNeut });
    }
  }


  updateNegChart(timestamp, sentiment) {
    const { negArray } = this.state;
    let updatedNeg = negArray;
    let binIndex = negArray.length - 1;
    let currentTime = negArray[binIndex][0];
    let coeff = 1000 * 10;
    let roundedTime = Math.round(Number(timestamp / coeff)) * coeff;
    if (roundedTime < (currentTime + 10000)) {
      if (sentiment === 'Negative') {
        updatedNeg[binIndex][1] += 1;
        this.setState({ negArray: updatedNeg });
      } 
    } else {
      if (sentiment === 'Negative') {
        updatedNeg = [...negArray, [roundedTime, 1]];
        this.setState({ negArray: updatedNeg });
      } else if (updatedNeg.length > 3) {
        updatedNeg = [...negArray.slice(0,1), [roundedTime, 0]];
        this.setState({ negArray: updatedNeg });
      } else {
        updatedNeg = [...negArray, [roundedTime, 0]];
        this.setState({ negArray: updatedNeg });
      }
    }
  }

  overallSentiment() {
    const { totalTweets: { negTotal, posTotal } } = this.state;
    const totalTweets = posTotal + negTotal;
    const posTweets = posTotal;
    const sentiment = posTweets / totalTweets;
    if (sentiment < 0.5) {
      this.setState({ sentiment: 'Negative' });
    } else if (sentiment > 0.5) {
      this.setState({ sentiment: 'Positive' });
    } else {
      this.setState({ sentiment: 'Neutral' });
    }
  }

  render() {
    const {
      currentTweets,
      totalTweets,
      sentiment,
      posArray,
      negArray,
      neutArray,
    } = this.state;
    return (
      <div>
        <Header
          emit={this.emit}
        />
        {this.state.searchStatus ? <Data
          currentTweets={currentTweets}
          totalTweets={totalTweets}
          sentiment={sentiment}
          posArray={posArray}
          negArray={negArray}
          neutArray={neutArray}
        /> : null}
      </div>
    );
  }
}

export default App;
