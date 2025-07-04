import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './TeacherSignin.css';
import server from "../../environment.js";


function TeacherSignin() {
  const [formData, setFormData] = useState({
    phno: "",
    name: "",
    email:""
  });
  const [message, setMessage] = useState(null); // State for displaying backend messages
  const [messageType, setMessageType] = useState(""); // State for message type (error or success)
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
    try {
      const response = await axios.post(`${server}/api/v1/teach/signin`, formData);
      if (response.status === 200) {
        setMessage("Signin successful! Redirecting...");
        setMessageType("success");
        navigate('/teachervalidate', { state: { phno: formData.phno, name: formData.name,email:formData.email } });
      }
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message || "Signin failed.");
        setMessageType("error");
      } else {
        setMessage("Something went wrong. Please try again later.");
        setMessageType("error");
      }
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="Enter Email"
            onChange={handleChange}
            className="form-input"
          />
          <button type="submit" className="btn btn-primary">Signin</button>
        </form>
        <p>Not registered? <Link to='/teachersignup'>Sign up here</Link></p>
      </div>
    </div>
  );
}

export default TeacherSignin;
