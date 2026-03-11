import { useNavigate } from "react-router-dom";
import React from 'react'
import bg from "./education.png"
import "./LandingPage.css"






function LandingPage() {

  const navigate = useNavigate();

  return (
  <div className="homepage">
     
      <h1>Welcome to the Exam Platform</h1>

       <p> Select User Type </p> 
     <div  className="hero">
          <div className='user-options'>
             <div className="user-card">
               <button onClick={()=> navigate("/studentloginpage")}> 🎓 Student</button>
              </div>
            <div className="user-card">
               <button onClick={()=> navigate("/teacherloginpage")}> 👨‍🏫 Teacher</button>
             </div>
        
          
       </div>
       
      
     
   </div>

   

   <div  className="education">
    
     <img src={bg}/>
    
   </div>
     
     
  </div>
    
  )
}

export default LandingPage;
