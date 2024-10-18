import { useLocation } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Ensures that Chart.js is registered properly
import './StudentDashboard.css'

function StudentDashboard() {
  const location = useLocation(); // Get student details from navigation state

  // Attendance data for the chart
  const data = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [100, 0], // You can dynamically calculate this based on attendance data
        backgroundColor: ['#4caf50', '#f44336'], // Green for present, Red for absent
        hoverBackgroundColor: ['#66bb6a', '#e57373'],
      },
    ],
  };

  
  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="student-dashboard-container">
      <div className="student-info-card">
        <h2 className='text-center p-5'>Student Dashboard</h2>
        <p className='mx-5'><strong>Roll Number:</strong> {location.state.rollNumber}</p>
        <p className='mx-5'><strong>Name:</strong> {location.state.name}</p>
        <p className='mx-5'><strong>Attendance Percentage:</strong> 100%</p>
      </div>

      <div className="attendance-chart-card">
        <h3 className='text-center'>Attendance Summary</h3>
        <div className="chart-container">
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
    