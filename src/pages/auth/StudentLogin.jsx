import { useNavigate } from 'react-router-dom';
import React from 'react'
import "./auth.css"

function StudentLogin() {

  const navigate = useNavigate();
  return (
    <div className='container'>
       <div className='form'>
        
        <p> Sign In</p>
        <label htmlFor="UserName">
            <input type='text'  placeholder='UserName' name='UserName'/> 
        </label>
        <label htmlFor="Password">
            <input type='Password' placeholder='Password' name='Password'/>
        </label>
        <button onClick={()=> navigate("/studentdashboard")}>Login</button>
       
    </div>
    </div>
   
  )
}

export default StudentLogin
