import React from 'react';
import TweetList from './TweetList.jsx';

class StreamView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="stream col-sm-4">
          <h1 className='viewTitle'>The Stream View</h1>
          <TweetList tweets={this.props.tweets}/>
        </div>
      </div>
    );
  }
}

export default StreamView;
