import React from 'react';
import '../css/AddDoctors.css';

const AddDoctor = () => (
  <div className="add-doctor">
    <h2>Add Doctor</h2>
    <input placeholder="Name" />
    <input placeholder="Email" />
    <input placeholder="Phone" />
    <input placeholder="Address" />
    <select><option>Specialty</option></select>
    <input type="file" />
    <button>Save</button>
  </div>
);

export default AddDoctor;
