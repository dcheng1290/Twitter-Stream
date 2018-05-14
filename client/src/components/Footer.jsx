import React from 'react';
import TimeSeries from './TimeSeries.jsx';



class Footer extends React.Component {

  render() {
    return (
      <div className='footer'>
        <TimeSeries chartArray={this.props.chartArray}/>
      </div>
    );
  }
}

export default Footer;