import React from 'react';

const GalleryItem = ({url, alt}) => (
  <li>
    <img src={url} alt={alt} />
  </li>
);

export default GalleryItem;
