import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import './TeacherSignin.css';

function TeacherSignin() {
  const [formData, setFormData] = useState({
    phno: "",
    name: ""
  });
  const [message, setMessage] = useState(null); // State for displaying backend messages
  const [messageType, setMessageType] = useState(""); // State for message type (error or success)
  const [loading, setLoading] = useState(false); // State for loading indication
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);

    // Basic validation
    if (!formData.phno || !formData.name) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    setLoading(true); // Start loading

    try {
      // Use the backend URL from the environment variable
      const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/signin`, formData);
      if (response.status === 200) {
        setMessage("Signin successful! Redirecting...");
        setMessageType("success");
        navigate('/teachervalidate', { state: { phno: formData.phno, name: formData.name } });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Signin failed. Please try again.";
      setMessage(errorMessage);
      setMessageType("error");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="teacher-signin-container">
      <div className="signin-box">
        <h1>Teacher Signin</h1>
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="signin-form">
          <label htmlFor="phno">Phone Number:</label>
          <input
            id="phno"
            type="text"
            value={formData.phno}
            name="phno"
            placeholder="Enter phone number"
            onChange={handleChange}
            className="form-input"
          />
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            placeholder="Enter name"
            onChange={handleChange}
            className="form-input"
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Signin'}
          </button>
        </form>
        <p>Not registered? <Link to='/teachersignup'>Sign up here</Link></p>
      </div>
    </div>
  );
}

export default TeacherSignin;
