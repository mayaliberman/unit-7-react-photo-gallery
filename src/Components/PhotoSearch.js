import React, { Component } from 'react';
import axios from 'axios';
import apiKey from '../config';
import PhotoContainer from './PhotoContainer';

export default class PhotoSearch extends Component {
  state = {
    photos: [],
    loading: true
  };

  componentDidMount() {
    this.performSearch(this.props.query);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.performSearch(this.props.query);
    }
  }

  performSearch = async query => {
    //fetch data from flickr
    try {
      const response = await axios.get(
        ` https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      );
      //set the response so that pics will be equal to the data array containing cat photos from flickr
      this.setState({
        photos: response.data.photos.photo,
        loading: false //initialize a loading state to display a loading message
      });
    } catch (error) {
      console.log('Something went wrong, could not access data', error);
      this.setState({ error: 'failed to search' });
    }
  };

  render() {
    if (this.state.photos) {
      return (
        <PhotoContainer
          data={this.state.photos}
          title={this.props.title || this.props.query}
        />
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}
