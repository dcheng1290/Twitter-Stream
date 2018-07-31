import React from 'react';
import logo from '../../../public/img/twit.png';
import Clock from 'react-live-clock';
import WeatherIcons from 'react-weathericons';
import SearchForm from './SearchForm.jsx';


const words = ['"One way to keep momentum going is to have constantly greater goals. -Michael Korda"',
  '"Always work hard. Intensity clarifies. It creates not only momentum, but also the pressure you need to feel either friction, or fulfillment. -Marcus Buckingham"',
  '"When you wake up in the morning you have two choices: go back to sleep, or wake up and chase those dreams. -Jennifer Chan"'];
const weatherIcons = ['day-sunny', 'day-fog', 'day-cloudy-windy'];
const randomNum = Math.floor(Math.random() * 3);
const randomTemperature = Math.floor(Math.random() * (60 - 49)) + 49;

const Header = (props) => {
  return (
    <div>
      <div className="default">
        <span className='cloud'><h5><WeatherIcons name={(weatherIcons)[randomNum]} size="2x" /> {(randomTemperature)}° San Francisco</h5></span>
        <div className="content col-sm-12">
          <h1><Clock format={'HH:mm'} ticking={true} timezone={'US/Pacific'} /></h1>
          <h2>What is happening out there?</h2>
          <SearchForm emit={props.emit} initTimestamp={props.initTimestamp}/>
          <p>{(words[randomNum])}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
