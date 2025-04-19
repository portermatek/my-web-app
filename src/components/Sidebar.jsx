import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Stethoscope, Plus, List, BarChart, Upload, Moon, Sun } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import '../css/Sidebar.css';

const Sidebar = () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Admin Panel</h3>
        <button className="theme-toggle-btn" onClick={() => {
          const current = document.documentElement.getAttribute('data-theme');
          document.documentElement.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
        }}>
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/admin">
          <LayoutDashboard size={18} /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin/doctors">
          <Stethoscope size={18} /> <span>Doctors</span>
        </NavLink>
        <NavLink to="/admin/add-doctor">
          <Plus size={18} /> <span>Add Doctor</span>
        </NavLink>
        <NavLink to="/admin/specialties">
          <List size={18} /> <span>Specialties</span>
        </NavLink>
        <NavLink to="/admin/reports">
          <BarChart size={18} /> <span>Reports</span>
        </NavLink>
        <NavLink to="/admin/upload">
          <Upload size={18} /> <span>Photo Upload</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
