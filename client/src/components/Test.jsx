import React from 'react';
import SearchForm from './SearchForm.jsx';

const Test = (props) => {
  return (
    <div className="hero container-fluid">
      <div className="row">
        <div className="content col-sm-12">
          <h1>Twitter Front End Project</h1>
          <h2>Search for brand keywords</h2>
          <SearchForm handleClick={props.handleClick} emit={props.emit}/>
        </div>
      </div>
    </div>
  );
};

export default Test;