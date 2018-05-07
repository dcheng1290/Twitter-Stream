import React from 'react';
import update from 'immutability-helper';
import io from 'socket.io-client';
import Header from './Header.jsx';  
import Data from './Data.jsx';
import Footer from './Footer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      status: '',
      searchStatus: false,
      totalSentiment: { total: 0, positive: 0, negative: 0, neutral: 0 },
    };
    this.emit = this.emit.bind(this);
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.getTweet = this.getTweet.bind(this);
  }

  connect() {
    this.setState({ status: 'connected' });
    console.log('Connected on socket: ' + this.socket.id);
  }
  
  disconnect() {
    this.setState({ status: 'disconnected' });
    console.log('Disconnected');
  }

  // connect to server when rendered
  componentWillMount() {
    this.socket = io.connect();
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);

    // send to client to get back tweet data
    var user = this;
    this.socket.on('sendMessage', function(tweetInfo) {
      user.getTweet(tweetInfo.tweet);
    });
  }

  // get the tweet to store in an array and push the object into array or else can't map it 
  getTweet(tweet) {
    var newTweets = this.state.tweets;  
    newTweets.push(tweet);
    this.setState({ tweets: newTweets });
    this.totalSentiment(tweet.sentiment);

  }

  emit(eventName, returnedData) {
    this.socket.emit(eventName, returnedData);
    this.setState({
      searchStatus: true,
      tweets: []
    });
  }

  totalSentiment(sentiment) {
    var totalSentiment = this.state.totalSentiment;
    var updatedSentiment = totalSentiment;

    if (sentiment === 'Positive') {
      updatedSentiment.positive ++;
      updatedSentiment.total ++;
      this.setState({ totalSentiment: updatedSentiment});
    } else if (sentiment === 'Negative') {
      updatedSentiment.negative ++;
      updatedSentiment.total ++;
      this.setState({ totalSentiment: updatedSentiment });
    } else {
      updatedSentiment.neutral++;
      updatedSentiment.total ++;
      this.setState({ totalSentiment: updatedSentiment });
    }
    console.log(this.state.totalSentiment);
  }

  render() {
    return (
      <div>
        <Header emit={this.emit}/>
        {this.state.searchStatus ?
          <Data tweets={this.state.tweets}
          /> : null}
        {/* <Data tweets={this.state.tweets}/> */}
        <Footer/>
      </div>
    );
  }
}


export default App;