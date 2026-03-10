import React from 'react'
import { useNavigate } from 'react-router-dom'
import  "./Student.css"

function Loginpage() {

    const navigate = useNavigate();
    
  return (
    <div className='student-loginpage' >

      
             <h1> Select  Your fate </h1> 
            <div className='login-container'>
               <div className='login-page'>    
               <button onClick={()=> navigate("/studentlogin")}> LOGIN</button>
             </div>
             <div className='login-page'>
                <button onClick={()=> navigate("/studentsignup")}> SIGNUP</button>
             </div>  
            </div>
              
      

       
  
    </div>
  )
}

export default Loginpage