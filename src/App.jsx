import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPanel from './pages/AdminPanel';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/admin/*" element={<AdminPanel />} />
      {/* Add a catch-all route for better handling of unknown paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;