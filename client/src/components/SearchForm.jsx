import React from 'react';
import App from './App.jsx';

class SearchForm extends React.Component {
  constructor() {
    super();
    this.search = this.search.bind(this);
  }                                                                                                                                                                                                                                                


  search() {
    this.props.emit('search', {keyword: 'kobe bryant'});
    this.props.handleClick();
  }

  render() {
    return (
      <div id="searchbar">
        <form className="input-group" onSubmit={this.search}>
          <input id="search" ref="keyword" type="search" placeholder="Enter Brand or Keyword"
            autoFocus="autofocus" className="form-control" />
          <span className="input-group-btn">
            <button id="submit" onClick={this.search} className="btn btn-default" type="button">Search</button>
          </span>
        </form>
      </div>
    );
  }
}

export default SearchForm;