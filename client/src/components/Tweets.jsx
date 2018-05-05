import React from 'react';

class Tweets extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className='tweetInfo'>
        <img className="profilePic" src={this.props.tweet.user.profile_image_url} />
        <div>
          <div className='userInfo'>
            <span>{this.props.tweet.user.name}</span>
            <span>{this.props.tweet.user.username}</span>
            <span>{this.props.tweet.user.location}</span>
            <span>{this.props.tweet.user.timezone}</span>
            <span>{this.props.tweet.created_at}</span>
          </div>
          <div>{this.props.tweet.sentiment}</div>
          <div>{this.props.tweet.text}</div>
        </div>
      </div>
    );
  }
}

export default Tweets;