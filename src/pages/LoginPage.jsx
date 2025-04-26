import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase'; // Make sure Firebase is configured
import { collection, getDocs, addDoc } from 'firebase/firestore';
import '../css/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminExists, setAdminExists] = useState(false); // to check if first time

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'admin'));
        if (!snapshot.empty) {
          setAdminExists(true); // admin already exists
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
        // First-time login → Save credentials
        await addDoc(adminRef, { email, password });
        alert('Admin account created successfully!');
        navigate('/admin');
      } else {
        // Validate credentials
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
