import React from 'react';
import TweetList from './TweetList.jsx';

class StreamView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <h1>The Stream View</h1>
          <TweetList tweets={this.props.tweets}/>
        </div>
      </div>
    );
  }
}

export default StreamView;
