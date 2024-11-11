import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './StudentSignup.css'; // Add your custom styles

function StudentSignup() {
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
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/studs/signup",
        formData
      );
      if (response.status === 201) {
        setMessage(response.data.message); // Set the success message from backend
        setTimeout(() => {
          navigate("/studentsignin"); // Redirect to sign-in after 2 seconds
        }, 1000);
      }
    } catch (err) {
      // Check if the error response is for an existing student
      if (err.response && err.response.status === 409) {
        setMessage(err.response.data.message); // Set the error message for already registered
      } else {
        console.log("Signup failed", err);
      }
    }
  };

  return (
    <div className="student-signup">
      <h1>Student Signup</h1>
      {message && <p className="success-message">{message}</p>} {/* Display success/error message */}
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
          Signup
        </button>
      </form>
      <p>
        Already registered? <Link to="/studentsignin">Signin</Link>
      </p>
    </div>
  );
}

export default StudentSignup;
