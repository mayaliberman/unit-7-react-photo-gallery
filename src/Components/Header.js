import React, { Component } from 'react';
import Nav from './Nav';
import SearchForm from './SearchForm';

export default class Header extends Component {
  render() {
    return (
      <div>
        <SearchForm onSearch={this.performSearch}/>
        <Nav />
      </div>
    );
  }
}
