import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const loginSuccessful = true;

    if (loginSuccessful) {
      onLogin();
    } else {
      alert('Login failed. Please try again.');
      setUserId('');
      setPassword('');
    }
  };

  return (
    <div className="login-container">
      <h1>Student Login</h1>
      <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
