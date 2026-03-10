import React from 'react'
import { useNavigate } from 'react-router-dom';

function TeacherLogin() {
     const navigate = useNavigate();
  return (
     <div className='container'>
          <div className='form'>
      
        <p> Sign In</p>
        <label htmlFor="UserName">
            <input type='text' placeholder='UserName' name='UserName'/>
        </label>
        <label htmlFor="Password">
            <input type='Password' placeholder='Password' name='Password'/>
        </label>
        <button onClick={()=> navigate("/teacherdashboard")}>Login</button>
     
       
    </div>   
    </div>
    
  )
}

export default TeacherLogin
