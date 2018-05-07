import React from 'react';
import StreamView from './StreamView.jsx';


const Data = (props) => {
  return (
    <div className="results container-fluid">


      <StreamView tweets={props.tweets}/>

    </div>
  );
};

export default Data;