import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import PhotoContainer from './Components/PhotoContainer';
import apiKey from './config';
import SearchForm from './Components/SearchForm';
import Nav from './Components/Nav';

export default class App extends Component {
  state = {
    photos: [],
    sunset: [],
    dogs: [],
    computers: [],
    loading: true
  };

  componentDidMount() {
    this.performSearch();
    this.performSearch('sunset', 'sunset');
    this.performSearch('dogs', 'dogs');
    this.performSearch('computers', 'computers');
  }

  performSearch = (query = 'sunset+people', key = 'photos') => {
    //fetch data from flickr
    axios
      .get(
        ` https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => {
        //set the response so that pics will be equal to the data array containing cat photos from flickr
        this.setState({
          [key]: response.data.photos.photo,
          loading: false //initialize a loading state to display a loading message
        });
      })
      .catch(error => {
        //this catch method outputs a message to the console, should axios fail to retrieve data
        console.log('Something went wrong, could not access data', error);
      });
  };

  render() {
    return (
      <HashRouter >
        <div className='container'>
        <h1>Photo Gallery</h1>
        <p>Enjoy searching photos from Flicker using the search field or the navigation buttons</p>
        <br />
          <Route
            render={props => (
              <SearchForm {...props} search={this.performSearch} />
            )}
          />
          <Nav />
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <PhotoContainer
                  {...props}
                  data={this.state.photos}
                  title='Results'
                />
              )}
            />
            <Route
              path='/search/:query'
              render={props => (
                <PhotoContainer {...props} data={this.state.photos} />
              )}
            />
            <Route
              path='/sunset'
              render={props => (
                <PhotoContainer
                  {...props}
                  data={this.state.sunset}
                  title='Sunset'
                />
              )}
            />
            <Route
              path='/dogs'
              render={props => (
                <PhotoContainer
                  {...props}
                  data={this.state.dogs}
                  title='Dogs'
                />
              )}
            />
            <Route
              path='/computers'
              render={props => (
                <PhotoContainer
                  {...props}
                  data={this.state.computers}
                  title='Computers'
                />
              )}
            />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}
