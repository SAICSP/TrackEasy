import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleTeacherClick = () => {
    navigate('/teachersignin');
  };

  const handleStudentClick = () => {
    navigate('/studentsignin');
  };

  return (
    <div className="home-container">
      <div className="overlay"></div>
      <div className="content">
        <h1 className="title">Welcome to TrackEasy</h1>
        <h2 className="subtitle">Login as a</h2>
        <div className="button-container">
          <button 
            className="btn teacher-btn animated-btn" 
            onClick={handleTeacherClick}
          >
            Teacher
          </button>
          <button 
            className="btn student-btn animated-btn" 
            onClick={handleStudentClick}
          >
            Student
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
