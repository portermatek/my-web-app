import React from 'react';
import '../css/LoginPage.css'; // Assuming you have a CSS file for styling



const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Log in</button>
      </div>
    </div>
  );
};

export default LoginPage;
