import React from 'react';
import SearchForm from './SearchForm.jsx';
import logo from '../../../public/img/twit.png';

const Header = (props) => {
  return (
    <div>
      <div className='header'>
        <h1><img id="twit" src={require('../../../public/img/twit.png')} />David's Twitter Project</h1>
      </div>
      <div className="default">
        {/* <div className="row"> */}
          <div className="content col-sm-12">
          <h1>Search for brand or keywords</h1>
            {/* <h2>Search for brand keywords</h2> */}
            <SearchForm emit={props.emit}/>
          </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Header;