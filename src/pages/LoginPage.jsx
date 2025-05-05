import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import '../css/LoginPage.css';
import logo from '../assets/logo.png'; // Import your logo

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminExists, setAdminExists] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'admin'));
        if (!snapshot.empty) {
          setAdminExists(true);
        }
      } catch (err) {
        console.error('Error checking admin credentials:', err);
      }
    };
    checkAdmin();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const adminRef = collection(db, 'admin');
      const snapshot = await getDocs(adminRef);

      if (snapshot.empty) {
        await addDoc(adminRef, { email, password });
        alert('Admin account created successfully!');
        navigate('/admin');
      } else {
        const adminDoc = snapshot.docs[0];
        const savedEmail = adminDoc.data().email;
        const savedPassword = adminDoc.data().password;

        if (email === savedEmail && password === savedPassword) {
          navigate('/admin');
        } else {
          alert('Invalid credentials. Please try again.');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="MediConnect Logo" className="login-logo" />
        <h2>{adminExists ? 'Admin Login' : 'Set Admin Credentials'}</h2>
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
        <button onClick={handleLogin}>
          {adminExists ? 'Log in' : 'Create Admin'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
