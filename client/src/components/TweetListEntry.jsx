import React from 'react';

const TweetListEntry = ({ tweet }) => {
  const {
    user,
    sentiment,
    text,
  } = tweet;

  const {
    profile_image_url,
    name,
    username,
  } = user;

  return (
    <div className='tweetInfo'>
      <img className='profilePic' src={profile_image_url} />
      <div className='data'>
        <div className='user'>
          <span className='name'>{name}</span>
          <span className='username'>@{username}</span>
        </div>
        <div className={'sentiment ' + sentiment}></div>
        <div className='text'>{text}</div>
      </div>
    </div>
  );
};

export default TweetListEntry;
