import React from 'react';
import TwitterActivityChart from './TwitterActivityChart.jsx';

class Dashboard extends React.Component {


  render() {
    let {
      totalTweets,
      sentiment,
      chartArray,
      posArray,
      negArray,
      neutArray,
    } = this.props; 
    return (
      <div className="dashboard col-sm-8">
        <TwitterActivityChart
          totalTweets={totalTweets}
          sentiment={sentiment}
          chartArray={chartArray}
          posArray={posArray}
          negArray={negArray}
          neutArray={neutArray}
        />
      </div>
    );
  }
}

export default Dashboard;