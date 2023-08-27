import React from 'react';
import './Logout.css';

const Logout = ({ onLogout }) => {
  return (
    <div className="logout">
      <h2>Attendance Marked</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Logout;
