import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './TeacherValidation.css'; // Add your custom styles

function TeacherValidation() {
  const [formData, setFormData] = useState({
    subject: '',
    branch: '',
    section: '',
    year: ''
  });

  const location = useLocation(); // Receive data from TeacherSignin
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    navigate('/teacherdashboard', { 
      state: { ...formData, phno: location.state.phno, name: location.state.name,email:location.state.email } 
    });
  };

  return (
    <div className="teachervalidation">
      <h1>Teacher Details</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          onChange={handleChange}
          id="subject"
          name="subject"
          value={formData.subject}
          placeholder="Enter your subject"
          required
        />
        <br />
        <label htmlFor="branch">Branch:</label>
        <input
          type="text"
          onChange={handleChange}
          id="branch"
          name="branch"
          value={formData.branch}
          placeholder="Enter your branch"
          required
        />
        <br />
        <label htmlFor="section">Section:</label>
        <input
          type="text"
          onChange={handleChange}
          id="section"
          name="section"
          value={formData.section}
          placeholder="Enter your section"
          required
        />
        <br />
        <label htmlFor="year">Year:</label>
        <input
          type="text"
          onChange={handleChange}
          id="year"
          name="year"
          value={formData.year}
          placeholder="Enter year (e.g., 2nd or 3rd)"
          required
        />
        <button type="submit" className="btn btn-primary">Validate</button>
      </form>
    </div>
  );
}

export default TeacherValidation;
