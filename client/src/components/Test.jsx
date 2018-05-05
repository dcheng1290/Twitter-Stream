import React from 'react';
import SearchForm from './SearchForm.jsx';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

const Test = (props) => {
  return (
    
    <div className="hero container-fluid">
      <MuiThemeProvider >
        <AppBar title="Twitter Front End Project" />
      </MuiThemeProvider>
      <div className="row">
        <div className="content col-sm-12">
          <h2>Search for brand keywords</h2>
          <SearchForm emit={props.emit}/>
        </div>
      </div>
    </div>
  );
};

export default Test;