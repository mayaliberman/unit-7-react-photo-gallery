import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import PhotoContainer from './Components/PhotoContainer';
import apiKey from './config';
import SearchForm from './Components/SearchForm';
import Nav from './Components/Nav';

export default class App extends Component {
  state = {
    photos: [],
    ants: [],
    dogs: [],
    computers: [],
    loading: true
  };

  componentDidMount() {
    this.performSearch();
    this.performSearch('cats', 'cats');
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
      <BrowserRouter>
        <div className='container'>
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
              path='/cats'
              render={props => (
                <PhotoContainer
                  {...props}
                  data={this.state.cats}
                  title='Cats'
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
      </BrowserRouter>
    );
  }
}
