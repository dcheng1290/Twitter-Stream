import React from 'react';
import LineChart from 'react-linechart';
// import '../../../node_modules/react-linechart/dist/styles.css';

class LineCharts extends React.Component {
  render() {
    const data = [
      {
        color: "steelblue",
        points: [{ x: 1, y: 2 }, { x: 3, y: 5 }, { x: 7, y: -3 }]
      }
    ];
    return (
      <div>
        <div className="dashboard col-sm-8">
          <h1>My First LineChart</h1>
          <LineChart
            width={100}
            height={100}
            data={data}
          />
        </div>
      </div>
    );
  }
}

export default LineCharts;