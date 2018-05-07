import React from 'react';
import Tweets from './Tweets.jsx';

class TweetList extends React.Component {
  constructor(props) {
    super(props);
  }
    
  render() {  
    return (
      <div className='tweetMap'>
       {this.props.tweets.map((tweet, index) => <Tweets tweet={tweet} key={index} />)}
      </div>
    );
  }
}

export default TweetList;