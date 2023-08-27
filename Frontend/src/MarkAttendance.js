import React, { useState } from 'react';

const MarkAttendance = ({ selectedDate, selectedStudents, onMarkAttendance }) => {
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);

  const handleSubmit = () => {
    setTimeout(() => {
      setAttendanceSubmitted(true);
      onMarkAttendance();
    }, 1000);
  };

  return (
    <div className="mark-attendance">
      <h2>Mark Attendance</h2>
      {selectedStudents.map((student, index) => (
        <div key={index}>
          <label>
            <input type="checkbox" checked={true} readOnly /> {student}
          </label>
        </div>
      ))}

      <button onClick={handleSubmit} disabled={attendanceSubmitted}>
        Submit
      </button>
      {attendanceSubmitted && <p>Attendance submitted successfully!</p>}
    </div>
  );
};

export default MarkAttendance;
