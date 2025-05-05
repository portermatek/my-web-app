import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // ✅ use HashRouter for GitHub Pages
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter> {/* ✅ GitHub Pages works with HashRouter */}
      <App />
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
