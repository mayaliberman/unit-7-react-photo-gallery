import React from 'react';
import GalleryItem from './GalleryItem';
import NoGifs from './NoGifs';

const SearchContainer = ({match}, props ) => {
  const results = props.data;
  const topic = match.params.topic
 
  let photos;
  if(results.length > 0) {
  photos = results.map(photo => 
    <GalleryItem 
    url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`}
     key={photo.id}/>
    )
  } else {
    photos = <NoGifs />
  }
 
  return (
    <div className='photo-container'>
      <h2>{topic}</h2>
      <ul>
        {photos}
      </ul>
    </div>
  );
};

export default SearchContainer;
