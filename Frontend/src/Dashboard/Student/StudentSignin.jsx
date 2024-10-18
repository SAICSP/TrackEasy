import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './StudentSignin.css'; // Add your custom styles

function StudentSignin() {
  const [formData, setFormData] = useState({
    rollNumber: "",
    name: "",
  });
  const [message, setMessage] = useState(""); // State for backend message
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(""); // Clear any previous message
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/studs/signin",
        formData
      );
      if (response.status === 200) {
        navigate("/studentdashboard", {
          state: { rollNumber: formData.rollNumber, name: formData.name },
        });
      }
    } catch (err) {
      // Handle the case where the signin fails
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message); // Set the error message from backend
      } else {
        console.log("Signin failed", err);
      }
    }
  };

  return (
    <div className="student-signin">
      <h1>Student Signin</h1>
      {message && <p className="error-message">{message}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="rollNumber">Roll Number:</label>
          <input
            id="rollNumber"
            type="text"
            value={formData.rollNumber}
            name="rollNumber"
            placeholder="Enter roll number"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            placeholder="Enter name in uppercase"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signin
        </button>
      </form>
      <p>
        Not registered? <Link to="/studentsignup">Sign up here</Link>
      </p>
    </div>
  );
}

export default StudentSignin;
