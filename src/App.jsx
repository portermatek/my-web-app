import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPanel from './pages/AdminPanel';

const App = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/admin/*" element={<AdminPanel />} />
  </Routes>
);

export default App;
