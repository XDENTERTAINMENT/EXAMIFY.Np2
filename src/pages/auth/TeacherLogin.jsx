import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function TeacherLogin() {
  const [username, setUsername] = useState("");
  const [errorusername, setErrorUsername] = useState("");
  const [errorpassword, setErrorPassword] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();

  const submithandle = async (e) => {


    let valid = true

    e.preventDefault();

    if (username.length > 10) {
      setErrorUsername("username shouldn't be higher than 10 characters");
      valid = false

    }
    else if (username.length <= 4) {
      setErrorUsername(" username shouldn't be  less than 5 characters ");
      valid = false
    }


    else {
      setErrorUsername("");
    };



    if (!username) {
      setErrorUsername("Username is required");
      hasError = false;
    } else if (username.length < 4 || username.length > 10) {
      setErrorUsername("Username must be 4–10 characters");
      hasError = false;
    }

    else {
      setErrorPassword("");
    }
    if (!valid) {
      return
    };


    try {
      const res = await axios.post("https://examify-np2.onrender.com/api/login", {
        username: username,
        password: password,
      });
      // ✅ Save token
      localStorage.setItem("token", res.data.token);
      console.log(res);
      alert(res.data.message);
      navigate("/teacherdashboard")
    }

    catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "login failed");
    }




  }

  return (
    <div className='containerauth'>
      <div className='classic2'>
        <form onSubmit={submithandle}>
          <p> Sign In</p>
          <label htmlFor="UserName">
            <input type='text' placeholder='UserName' name='UserName'
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </label>
          <p className='error'>{errorusername}</p>
          <label htmlFor="Password">
            <input type='Password' placeholder='Password' name='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </label>
          <p className='error'>{errorpassword}</p>
          <button type='submit'>Login</button>


        </form>


      </div>
    </div>

  )
}

export default TeacherLogin
