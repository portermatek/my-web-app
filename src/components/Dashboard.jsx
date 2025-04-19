import React from 'react';
import '../css/Dashboard.css';

const Dashboard = () => (
  <div className="dashboard">
    <h2>Dashboard</h2>
    <div className="stats">
      <div>Total Doctors: 0</div>
      <div>Total Specialties: 2</div>
      <div>Suspended: 0</div>
    </div>
    <div className="overview">Overview (charts/data here)</div>
  </div>
);

export default Dashboard;
