import React from 'react';
import styles from './CSS/TweetList.scss';
import Tweets from './Tweets.jsx';

class TweetList extends React.Component {
  constructor(props) {
    super(props);
  }
    
  render() {  
    return (
      <div>
        <h5>The working twitter stream</h5>
        {this.props.tweets.map((mappedTweet, index) => <Tweets tweet={mappedTweet} key={index} />)}
      </div>
    );
  }
}

export default TweetList;