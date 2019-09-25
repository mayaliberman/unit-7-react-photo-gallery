import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import Nav from './Components/Nav';
import PhotoContainer from './Components/PhotoContainer';
import apiKey from './config';



export default class App extends Component {
  
    state = {
      photos: [],
      
    };
 

  componentDidMount() {
    axios
      .get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sunset&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({photos: response.data.photos.photo})
        console.log(response);
        console.log(this.photos)
       })
      .catch(error => {
        // handle error
        console.log('Error fetching and parsing data',error);
      });
  }

  getPhoto = (query) => {
    axios
    .get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&querys=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({query: response.data.photos.photo})
      console.log(response);
      console.log(this.photos)
     })
    .catch(error => {
      // handle error
      console.log('Error fetching and parsing data',error);
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className='container'>
           <Route path="/" component={SearchForm} />
          </div>
          <Nav />
            <Route path="/cats"  />
            <Route path="/dogs" />
            <Route path="/computers"  />
          
        </BrowserRouter>
        <PhotoContainer data={this.state.photos}/>
      </div>
    );
  }
}

