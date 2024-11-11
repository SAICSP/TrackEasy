import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import NotFound from './NotFound.jsx'
import Home from './Home/Home.jsx'
import StudentSignin from './Dashboard/Student/StudentSignin.jsx'
import StudentSignup from './Dashboard/Student/StudentSignup.jsx'
import TeacherSignin from './Dashboard/Teacher/TeacherSignin.jsx'
import TeacherSignup from './Dashboard/Teacher/TeacherSignup.jsx'
import StudentDashboard from './Dashboard/Student/StudentDashboard.jsx'
import TeacherDashboard from './Dashboard/Teacher/TeacherDashboard.jsx'
import './main.css'
import TeacherValidation from './Dashboard/Teacher/TeacherValidation.jsx'
import ViewReport from './Dashboard/Report/ViewReport.jsx'





createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/studentsignin' element={<StudentSignin/>}/>
    <Route path='/studentsignup' element={<StudentSignup/>}/>
    <Route path='/teachersignup' element={<TeacherSignup/>}/>
    <Route path='/teachersignin' element={<TeacherSignin/>}/>
    <Route path='/teacherdashboard' element={<TeacherDashboard/>}/>
    <Route path='/studentdashboard' element={<StudentDashboard/>}/>
    <Route path='/teachervalidate' element={<TeacherValidation/>}/>
    <Route path='/viewreports' element={<ViewReport/>}/>
    <Route path='*' element={<NotFound/>}/>
  </Routes>
  </BrowserRouter>  
)