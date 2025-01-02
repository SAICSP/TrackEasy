import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './TeacherSignup.css'; // Add a custom CSS file for extra styling

function TeacherSignup() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phno: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setErrorMessage(""); // Clear the error message when user types
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://trackeasy-vcfj.onrender.com/api/v1/teach/signup', formData);
      if (response.status === 201) {
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/teachersignin');
        }, 2000);
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrorMessage(err.response.data.message); // Set error message if teacher already exists
      } else {
        console.log('Signup failed', err);
      }
    }
  };

  return (
    <div className="teacher-signup-container d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-lg">
        <h1 className="text-center mb-4">Teacher Signup</h1>

        {showSuccess && (
          <div className="alert alert-success text-center" role="alert">
            Signup successful! Redirecting to sign-in page...
          </div>
        )}

        {errorMessage && ( // Render error message
          <div className="alert alert-danger text-center" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={formData.email}
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={formData.name}
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="phno">Phone Number:</label>
            <input
              id="phno"
              type="text"
              className="form-control"
              value={formData.phno}
              name="phno"
              placeholder="Enter phone number"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block w-100">
            Signup
          </button>
        </form>

        <p className="text-center mt-3">
          Already registered? <Link to='/teachersignin'>Sign in here</Link>
        </p>
      </div>
    </div>
  );
}

export default TeacherSignup;
