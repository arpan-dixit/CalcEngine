import React, { useState } from 'react';
import Login from './Login';
import AttendanceInterface from './AttendanceInterface';
import Logout from './Logout';
import 'react-datepicker/dist/react-datepicker.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [markedAttendance, setMarkedAttendance] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleMarkAttendance = () => {
    setMarkedAttendance(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setMarkedAttendance(false);
  };

  return (
    <div className="app">
      {!loggedIn && <Login onLogin={handleLogin} />}
      {loggedIn && !markedAttendance && <AttendanceInterface onMarkAttendance={handleMarkAttendance} />}
      {loggedIn && markedAttendance && <Logout onLogout={handleLogout} />}
      {/* Render other components as needed */}
      {/* <StudentList /> */}
    </div>
  );
};

export default App;
