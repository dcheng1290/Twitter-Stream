import React from 'react';


class HistoryChart extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    return (
      <div className='HistoryChart'>
        <h1>Historical data from last 3 months</h1>
      </div>
    );
  }
}

export default HistoryChart;