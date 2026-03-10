import { Routes, Route } from "react-router-dom";
import React from 'react'
import StudentLogin from "../auth/StudentLogin";
import LandingPage from "../landingPage/landingPage";
import TeacherDashboard from "../teacher/TeacherDashboard";
import StudentDashboard from "../student/StudentDashboard"
import About from "../About/About";
import Loginpage from "../student/Loginpages";
import Loginpaget from "../teacher/Loginpaget";
import StudentSignup from "../auth/StudentSignup";
import TeacherLogin from "../auth/TeacherLogin";
import TeacherSignup from "../auth/TeacherSignup";
import CreateExamPage from "../teacher/CreateExamPage";
import Exampage from "../student/exampage";






function AppRoutes() {
  return (
    <div>
      
    <Routes>
       <Route path="/" element={<LandingPage />} />
      <Route path="/studentlogin" element={<StudentLogin/>}/>
      <Route path="/studentdashboard" element={<StudentDashboard/>}/>
      <Route path="/about"  element={<About/>}/>
      <Route path="/studentloginpage" element={<Loginpage/>}/>
      <Route path="/teacherloginpage"  element={<Loginpaget/>}/>
      <Route path="/studentsignup"   element={<StudentSignup/>}/>
      <Route path="/teacherlogin"  element={<TeacherLogin/>}/>
      <Route path="/teachersignup" element={<TeacherSignup/>}/>
      <Route path="/teacherdashboard" element={<TeacherDashboard/>}/>
      <Route path="/examexampage"    element={<CreateExamPage/>}/>
      <Route path="/exampage"    element={<Exampage/>}/>
      
    
   


     
    </Routes>
  

    </div>
  )
}

export default AppRoutes
