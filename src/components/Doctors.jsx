import React from 'react';
import '../css/Doctors.css';

const Doctors = () => (
  <div className="doctors">
    <h2>Doctors</h2>
    <button className="add-btn">Add Doctor</button>
    <div className="filters">
      <select><option>Filter by Specialty</option></select>
      <select><option>Filter by City</option></select>
    </div>
    <table>
      <thead>
        <tr><th>Name</th><th>Specialty</th><th>City</th><th>Status</th><th>Action</th></tr>
      </thead>
      <tbody>
        <tr><td>–</td><td>–</td><td>City</td><td>Active</td><td><button>Edit</button></td></tr>
      </tbody>
    </table>
  </div>
);

export default Doctors;
