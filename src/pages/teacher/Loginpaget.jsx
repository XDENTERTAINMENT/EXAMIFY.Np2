import React from 'react'
import { useNavigate } from 'react-router-dom'
import  "./Teacher.css"

function Loginpaget() {

 const navigate = useNavigate();
 
  return (
    <div className='student-loginpage' >

      <div  className='students'>
             <h1> Select  Your fate </h1> 
            <div className='login-container'>
               <div className='login-page'>    
               <button onClick={()=> navigate("/teacherlogin")}> LOGIN</button>
             </div>
             <div className='login-page'>
                <button onClick={()=> navigate("/teachersignup")}> SIGNUP</button>
             </div>  
            </div>
              
      </div>

       
  
    </div>
    
    
    
  )
}

export default Loginpaget
