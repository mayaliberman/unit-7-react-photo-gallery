import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import Nav from './Components/Nav';
import PhotoContainer from './Components/PhotoContainer';
import apiKey from './config';
import NoGifs from './Components/NoGifs';

export default class App extends Component {
  state = {
    photos: [], 
    cats: [], 
    dogs: [],
    computers: [],
    loading: true
  };

  componentDidMount() {
    // this.performSearch();
   this.renderCats();
    this.renderDogs();
    this.renderComputers();
    
  }

 renderCats = () => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => {
        this.setState({cats: response.data.photos.photo });
        
      })

      .catch(error => {
        // handle error
        console.log('Error fetching and parsing data', error);
      });
  }


  renderDogs = () => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => {
        this.setState({ dogs: response.data.photos.photo });
              })

      .catch(error => {
        // handle error
        console.log('Error fetching and parsing data', error);
      });
  }

  renderComputers = () => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => {
        this.setState({ computers: response.data.photos.photo });
        console.log(this.photos);
      })

      .catch(error => {
        // handle error
        console.log('Error fetching and parsing data', error);
      });
  }

  performSearch = (query = 'ants') => {
    //fetch data from flickr
    axios 
      .get(
        ` https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => { //set the response so that pics will be equal to the data array containing cat photos from flickr
        this.setState({
          photos: response.data.photos.photo, 
          loading: false //initialize a loading state to display a loading message
        });
      })
      .catch(error => { //this catch method outputs a message to the console, should axios fail to retrieve data
        console.log("Something went wrong, could not access data", error);
      });
  }; 

  render() {
    console.log(this.state.photos)
    return (
      <div>
      <SearchForm onSearch={this.performSearch}/>
        <BrowserRouter>
          {/* <Switch> */}
            {/* <Route path='/' component={SearchForm} /> */}
          {/* <Route path="search/:query" component={PhotoContainer}></Route> */}
          
            <Nav />
            {/* <Route  path="/"  render={(props) => <PhotoContainer {...props} data={this.state.cats} />} /> */}
            <Route  path="/cats"  render={(props) => <PhotoContainer {...props} data={this.state.cats} title='cats'/>} />
            <Route  path="/dogs"  render={(props) => <PhotoContainer {...props} data={this.state.dogs} title='dogs'/>} />
            <Route  path="/computers"  render={(props) => <PhotoContainer {...props} data={this.state.computers} title='computers'/>} />
            <Route path="/search/:query" render={(props) => <PhotoContainer {...props} data={this.state.photos} />} />
            {/* <Route component={NoGifs} /> */}
          {/* </Switch> */}
        </BrowserRouter>
        <PhotoContainer data={this.state.photos} />
      </div>
    );
  }
}
