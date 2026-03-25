import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function TeacherLogin() {
    const [username, setUsername] = useState("");
      const [errorusername , setErrorUsername]  = useState("");
      const [errorpassword , setErrorPassword]  = useState("");
      const [password,setPassword] = useState("");
    
        
       const navigate = useNavigate();

     const submithandle=(e)=>{

       

      let valid = true

       e.preventDefault();

        if(username.length >10){
       setErrorUsername("username shouldn't be higher than 10 characters");
           valid=false
         
          }
          else if(username.length <=4){
            setErrorUsername(" username shouldn't be  less than 5 characters ");
             valid=false
          }
        

             else{
                setErrorUsername("");
             };


         
          if((password.length <= 7 )){
          setErrorPassword("password shouldn't be less than 8 characters");
           valid=false
         }

         else if (password.length >10) {
           setErrorPassword("password shouldn't be higher than 10 characters");
           valid=false
         }
         
           else{
         setErrorPassword("");
           }

       if(  valid){
          navigate("/teacherdashboard")
          
          
       }

       


    }
  
  return (
     <div className='containerauth'>
          <div className='classicform'>
          <form   onSubmit={submithandle}>      
              <p> Sign In</p>
        <label htmlFor="UserName">
            <input type='text' placeholder='UserName' name='UserName' onChange={ (e) => setUsername(e.target.value)}/>
        </label>
        <p className='error'>{errorusername}</p>
        <label htmlFor="Password">
            <input type='Password' placeholder='Password' name='Password'  onChange={ (e) => setPassword(e.target.value)}/>
        </label>
        <p className='error'>{errorpassword}</p>
        <button type='submit'>Login</button>
 
     
          </form>
        
       
    </div>   
    </div>
    
  )
}

export default TeacherLogin
