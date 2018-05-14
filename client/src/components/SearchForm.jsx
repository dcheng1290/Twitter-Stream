import React, { Component } from 'react';
import App from './App.jsx';


class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
    this.emit = this.props.emit;
    this.initTimestamp = this.props.initTimestamp;
    this.updateKeyword = this.updateKeyword.bind(this);
    this.search = this.search.bind(this);
  }

  updateKeyword(e) {
    this.setState({
      keyword: e.target.value,
    });
  }

  search(e) {
    e.preventDefault();
    const initTimestamp = new Date().getTime();
    this.emit('search', { keyword: this.state.keyword });
    this.initTimestamp({ initTimestamp: initTimestamp });
  }

  render() {
    return (
      <div id='searchForm'>
        <form className='input-group' onSubmit={this.search}>
          <input id='search' ref="keyword" type="search" placeholder="Enter Keyword" onChange={this.updateKeyword}
            autoFocus="autofocus" className="form-control" />
          <span className='input-group-btn'>
            <button type="submit" className="btn btn-default" disabled={!this.state.keyword}>Search</button>
          </span>
        </form>
      </div>
    );
  }
}

export default SearchForm;
