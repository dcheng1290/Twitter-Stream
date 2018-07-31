import React, {Component} from 'react';
import Highcharts from 'highcharts';
import { HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, LineSeries, ColumnSeries, BarSeries } from 'react-jsx-highcharts';
import moment from 'moment';

Highcharts.setOptions({
  global: {
    timezone: 'America/Los_Angeles',
    useUTC: false,
  },
});

class TimeSeries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positive: '',
      neutral: '',
      negative: '',
    };
  }

  componentWillMount() {
    this.getTweet();
  }

  getTweet() {
    this.setState({
      positive: this.props.posArray,
      neutral: this.props.neutArray,
      negative: this.props.negArray,
    });
  }

  render() {
    const plotOptions = {
      series: {
        borderWidth: 0,
        pointPadding: 0,
        groupPadding: 0,
      },
    };
    return (
      <div className='highchart'>
        <HighchartsChart plotOptions={plotOptions} className='chart'>
        <Chart />
          {/* <Title>Sentiment Analysis</Title> */}

          <Legend>
          </Legend>

          <XAxis type='datetime' >
            <XAxis.Title>Time</XAxis.Title>
          </XAxis>

          <YAxis id='sentimentLabel' >
            <YAxis.Title>Sentiment</YAxis.Title>
            <LineSeries id='positive' name='Positive' color='green' data={this.props.posArray} />
            <LineSeries id='neutral' name='Neutral' color='#DAA520' data={this.props.neutArray} />
            <LineSeries id='negative' name='Negative' color='red' data={this.props.negArray} />
          </YAxis>

        </HighchartsChart>
      </div>
    );
  }
}

export default withHighcharts(TimeSeries, Highcharts);
