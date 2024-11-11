import { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewReport.css';

function ViewReport() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/attend/getreports');
        
        // Sort reports by date in descending order
        const sortedReports = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setReports(sortedReports);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="report-dashboard">
      <h1 className="text-center mt-5">Report Dashboard</h1>

      <div className="reports-container">
        {reports.map((report, index) => (
          <div key={index} className="report-card">
            <h3>Report for {report.subject} - {report.section}</h3>
            <p><strong>Teacher Name:</strong> {report.teacherName}</p>
            <p><strong>Date:</strong> {new Date(report.date).toLocaleDateString()}</p>
            <p><strong>Presentees:</strong> {report.presentees}</p>
            <p><strong>Absentees:</strong> {report.absentees}</p>
            <p><strong>Absentee Roll Numbers:</strong> {report.absenteeRollNumbers.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewReport;