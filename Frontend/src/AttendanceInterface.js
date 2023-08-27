import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import MarkAttendance from './MarkAttendance';
import './AttendanceInterface.css';

const AttendanceInterface = ({ onMarkAttendance }) => {
  const students = ['Student 1', 'Student 2', 'Student 3'];
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleCheckboxChange = (studentName) => {
    setSelectedStudents((prevSelectedStudents) =>
      prevSelectedStudents.includes(studentName)
        ? prevSelectedStudents.filter((name) => name !== studentName)
        : [...prevSelectedStudents, studentName]
    );
  };

  const studentOptions = students.map((student)=>({
    value: student,
    label:student,
  }));

  return (
    <div className="attendance-interface">
      <h2 className="attendance-heading">Select Current Date</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date"
        className="date-picker"
      />

<h2 className="attendance-heading">Find your name in the list</h2>
      <Select
        options={studentOptions}
        isMulti
        value={selectedStudents.map((student) => ({ value: student, label: student }))}
        onChange={(selectedOption) =>
          setSelectedStudents(selectedOption.map((option) => option.value))
        }
        className="student-select"
      />

      <MarkAttendance
        selectedDate={selectedDate}
        selectedStudents={selectedStudents}
        onMarkAttendance={onMarkAttendance}
      />
    </div>
  );
};

export default AttendanceInterface;
