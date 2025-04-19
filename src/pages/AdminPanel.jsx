import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import Doctors from '../components/Doctors';
import AddDoctor from '../components/AddDoctor';
import Specialities from '../components/Specialties';
import Reports from '../components/Reports';
import PhotoUpload from '../components/PhotoUpload';
import '../css/AdminPanel.css'; // Assuming you have a CSS file for styling

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="add-doctor" element={<AddDoctor />} />
          <Route path="specialties" element={<Specialities />} />
          <Route path="reports" element={<Reports />} />
          <Route path="upload" element={<PhotoUpload />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
