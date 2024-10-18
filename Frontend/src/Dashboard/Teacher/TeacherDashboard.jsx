import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import './TeacherDashboard.css';

function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [attendanceSummary, setAttendanceSummary] = useState(null); // State for summary
  const location = useLocation(); // Get teacher details from navigation state

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/v1/studs/students`); // Use environment variable
        setStudents(response.data);
        const initialAttendance = response.data.reduce((acc, student) => {
          acc[student.rollNumber] = 'Present';
          return acc;
        }, {});
        setAttendance(initialAttendance);
      } catch (error) {
        console.log('Failed to fetch students', error);
      }
    };

    fetchStudents();
  }, []);

  const handleAttendance = (rollNumber, status) => {
    setAttendance(prevState => ({
      ...prevState,
      [rollNumber]: status,
    }));

    const currentIndex = students.findIndex((student) => student.rollNumber === rollNumber);

    if (status === 'Absent' && currentIndex < students.length - 1) {
      const nextStudentRoll = students[currentIndex + 1].rollNumber;
      const nextStudentElement = document.getElementById(nextStudentRoll);

      if (nextStudentElement) {
        nextStudentElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSubmit = () => {
    const presenteesCount = Object.values(attendance).filter(status => status === 'Present').length;
    const absenteesCount = Object.values(attendance).filter(status => status === 'Absent').length;
    const absenteesRollNumbers = Object.keys(attendance).filter(rollNumber => attendance[rollNumber] === 'Absent');

    const today = new Date().toLocaleDateString();

    setAttendanceSummary({
      name: location.state.name,
      subject: location.state.subject,
      branch: location.state.branch,
      section: location.state.section,
      year: location.state.year,
      date: today,
      presenteesCount,
      absenteesCount,
      absenteesRollNumbers: absenteesRollNumbers.join(', '),
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const summaryContent = `
      Name: ${location.state.name}
      Subject: ${location.state.subject}
      Branch: ${location.state.branch}
      Section: ${location.state.section}
      Year: ${location.state.year}
      Date: ${today}
      Presentees: ${presenteesCount}
      Absentees: ${absenteesCount}
      Absentees Roll Numbers: ${absenteesRollNumbers.join(', ')}
    `;

    const blob = new Blob([summaryContent], { type: 'text/plain' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Report_${today.replace(/\//g, '-')}.txt`;

    link.click();
  };

  const renderChart = () => {
    if (!attendanceSummary) return null;

    const data = {
      labels: ['Presentees', 'Absentees'],
      datasets: [
        {
          data: [attendanceSummary.presenteesCount, attendanceSummary.absenteesCount],
          backgroundColor: ['#4caf50', '#f44336'], // Green for presentees, red for absentees
          hoverBackgroundColor: ['#66bb6a', '#e57373'],
        },
      ],
    };

    return (
      <div className="chart-container">
        <Pie data={data} options={{ maintainAspectRatio: false }} />
      </div>
    );
  };

  return (
    <div className='main'>
      <h1 className='text-center mb-5 pt-5 '>Teacher Dashboard</h1>

      <div className="dashboard-container">
        {/* Teacher Info Card */}
        <div className="card teacher-info">
          <h2 className='text-center'> Teacher Details</h2>
          <p><strong>Name:</strong> {location.state.name}</p>
          <p><strong>Phone Number:</strong> {location.state.phno}</p>
          <p><strong>Subject:</strong> {location.state.subject}</p>
          <p><strong>Branch:</strong> {location.state.branch}</p>
          <p><strong>Section:</strong> {location.state.section}</p>
          <p><strong>Year:</strong> {location.state.year}</p>
        </div>

        {/* Attendance Summary Card */}
        {attendanceSummary && (
          <div className="card attendance-summary">
            <h3>Attendance Summary</h3>
            <p><strong>Subject:</strong> {attendanceSummary.subject}</p>
            <p><strong>Section:</strong> {attendanceSummary.section}</p>
            <p><strong>Date:</strong> {attendanceSummary.date}</p>
            <p><strong>Presentees:</strong> {attendanceSummary.presenteesCount}</p>
            <p><strong>Absentees:</strong> {attendanceSummary.absenteesCount}</p>
            <p><strong>Absentees Roll Numbers:</strong> {attendanceSummary.absenteesRollNumbers}</p>

            {/* Render Attendance Chart */}
            {renderChart()}
          </div>
        )}
      </div>

      <div className="data">
        {students.map((student) => (
          <div className="student" id={student.rollNumber} key={student._id}>
            <p><b>{student.rollNumber}</b></p>
            <p><b>{student.name}</b></p>
            <button
              className={`btn ${attendance[student.rollNumber] === 'Present' ? 'btn-success' : 'btn-light'}`}
              onClick={() => handleAttendance(student.rollNumber, 'Present')}
            >
              Present
            </button>
            <button
              className={`btn ${attendance[student.rollNumber] === 'Absent' ? 'btn-danger' : 'btn-light'} absent`}
              onClick={() => handleAttendance(student.rollNumber, 'Absent')}
            >
              Absent
            </button>
          </div>
        ))}
      </div>

      <button className='btn btn-success submit' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default TeacherDashboard;
