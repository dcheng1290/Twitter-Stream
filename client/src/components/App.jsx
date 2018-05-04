import React from 'react';
import io from 'socket.io-client';
import styles from './CSS/App.scss';
import SearchForm from './SearchForm.jsx';
import TweetList from './TweetList.jsx';
import Test from './Test.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      status: '',
      searchStatus: false,
    };
    this.emit = this.emit.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    console.log('Disconnected from socket: ' + this.socket.id);
  }

  // connect to server when rendered
  componentDidMount() {
    this.socket = io.connect();
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);

    // send to client to get back tweet data
    var user = this;
    this.socket.on('sendMessage', function(tweetInfo) {
      user.getTweet(tweetInfo);
      console.log('tweetinfo: ' + tweetInfo);
    });
  }

  // get the tweet to store in an array
  getTweet(tweet) {
    this.setState({ tweets: tweet });
    console.log('state of tweets array: ' + this.state.tweets);
  }

  handleClick() {
    this.setState({
      searchStatus: true,
    });
  }

  emit(eventName, returnedData) {
    this.socket.emit(eventName, returnedData);
  }

  render() {
    return (
      <div>
        <Test handleClick={this.handleClick} emit={this.emit}/>
        {this.state.searchStatus ?
          <TweetList
          /> : null}
      </div>
    );
  }
}


export default App;