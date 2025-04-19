import React from 'react';
import '../css/PhotoUpload.css';

const PhotoUpload = () => (
  <div className="photo-upload">
    <h2>Photo Upload</h2>
    <select><option>Select Doctor</option></select>
    <input type="file" />
    <button>Upload</button>
  </div>
);

export default PhotoUpload;
