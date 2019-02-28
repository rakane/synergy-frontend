import React, { Component } from 'react';
import SearchArt from '../../assets/search.svg';

import './Search.css';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      input: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form id="search" onSubmit={this.handleSubmit}>
          <input
            type="text"
            id="search-input"
            value={this.state.input}
            onChange={this.handleChange}
            placeholder="Search"
          />
          <input
            id="submit-img"
            type="image"
            src={SearchArt}
            name="submit"
            alt="Submit"
          />
        </form>
      </div>
    );
  }
}

export default Search;
