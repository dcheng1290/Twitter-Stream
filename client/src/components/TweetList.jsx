import React from 'react';
import TweetListEntry from './TweetListEntry.jsx';

const TweetList = ({ currentTweets }) => (
  <div className='tweetMap'>
    {
      currentTweets.map((tweet, index) => {
        return <TweetListEntry tweet={tweet} key={index} />;
      })
    }
  </div>
);

export default TweetList;
