import React from 'react';
import update from 'immutability-helper';
import io from 'socket.io-client';
import styles from './CSS/App.scss';
import SearchForm from './SearchForm.jsx';
import TweetList from './TweetList.jsx';
import Test from './Test.jsx';  
import Tweets from './Tweets.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      status: '',
      searchStatus: false,
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
  }

  emit(eventName, returnedData) {
    this.socket.emit(eventName, returnedData);
    this.setState({searchStatus: true})
  }

  render() {
    return (
      <div>
        <Test emit={this.emit}/>
        {this.state.searchStatus ?
        <TweetList tweets={this.state.tweets}
        /> : null}
      </div>
    );
  }
}


export default App;