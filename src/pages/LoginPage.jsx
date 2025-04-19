import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // You can add real authentication here
    if (email && password) {
      // Simulate successful login
      navigate('/admin'); // Or whatever path AdminPanel is under
    } else {
      alert('Please enter email and password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Log in</button>
      </div>
    </div>
  );
};

export default LoginPage;
