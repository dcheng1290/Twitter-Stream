import React from 'react';

class Tweets extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className='tweetInfo'>
        <img className="profilePic" src={this.props.tweet.user.profile_image_url} />
        <div className='data'>
          <div className='user'>
            <span className='name'>{this.props.tweet.user.name}</span>
            <span className='username'>@{this.props.tweet.user.username}</span>
            {/* <span className='location'>{this.props.tweet.user.location}</span>
            <span className='timezone'>{this.props.tweet.user.timezone}</span>
            <span className='createdAt'>{this.props.tweet.created_at}</span> */}
          </div>
          {/* <div className='sentiment'>{'sentiment: ' + this.props.tweet.sentiment}</div> */}
          <div className='text'>{this.props.tweet.text}</div>
        </div>
      </div>
    );
  }
}

export default Tweets;