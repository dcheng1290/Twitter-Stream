import React from 'react';
import styles from './CSS/TweetList.scss';

const TweetList = (props) => {
  return (
    <div className={styles.row}>
      {/* {props.tweets.map((tweet, i) => <Tweets/>)} */}
      <h1>Tweets Stream Component View</h1>
    </div>
  );
};

export default TweetList;