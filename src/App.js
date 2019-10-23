import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PhotoSearch from './Components/PhotoSearch';
import SearchForm from './Components/SearchForm';
import Nav from './Components/Nav';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <h1>Photo Gallery</h1>
          <p>
            Enjoy searching photos from Flicker using the search field or the
            navigation buttons
          </p>
          <br />
          <SearchForm />
          <Nav />
          <Switch>
            <Route
              exact
              path='/'
              render={() => <PhotoSearch title='Results' query='People' />}
            />
            <Route path='/dogs' render={() => <PhotoSearch query='dogs' />} />
            <Route
              path='/sunset'
              render={() => <PhotoSearch query='sunset' />}
            />
            <Route
              path='/computers'
              render={() => <PhotoSearch query='computers' />}
            />
            <Route
              path='/search/:query'
              render={props => <PhotoSearch query={props.match.params.query} />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
