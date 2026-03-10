import React from 'react'
import "./auth.css"
import { useNavigate } from 'react-router-dom';

function StudentSignup() {
    const navigate = useNavigate();
  return (
    <div className='container'>
        <div className='form'>
      
        <p> Sign Up</p>
        <label htmlFor="UserName">
            <input type='text' placeholder='UserName' name='UserName'/>
        </label>
        <label htmlFor="Password">
            <input type='Password' placeholder='Password' name='Password'/>
        </label>
         <button onClick={()=> navigate("/studentlogin")}>Sign up</button>
      
    </div>    
    </div>
   
  )
}

export default StudentSignup
