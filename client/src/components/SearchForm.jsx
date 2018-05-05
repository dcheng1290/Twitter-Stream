import React from 'react';
import App from './App.jsx';

class SearchForm extends React.Component {
  constructor() {
    super();
    this.state = {
      keyword: ''
    };
    this.submit = this.submit.bind(this);
    this.updateKeyword = this.updateKeyword.bind(this);
    this.search = this.search.bind(this);
  }                             
  
  updateKeyword(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  submit(e) {
    e.preventDefault();
    const { keyword } = this.state;
    this.setState({ keyword: '' });
  }

  search() {
    this.props.emit('search', {keyword: this.state.keyword});
  }

  render() {
    return (
      <div id="searchbar">
        <form className="input-group" onSubmit={() => {this.search; this.submit(e)}}>
          <input id="search" ref="keyword" type="search" placeholder="Enter Keyword" onChange={this.updateKeyword}
            autoFocus="autofocus" className="form-control" />
          <span className="input-group-btn">
            <button id="submit" disabled={!this.state.keyword} onClick={this.search} className="btn btn-default" type="button">Search</button>
          </span>
        </form>
      </div>
    );
  }
}

export default SearchForm;