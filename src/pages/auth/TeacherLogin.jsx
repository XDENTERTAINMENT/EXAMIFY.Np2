import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./auth.css"
import API from '../../services/api';

function TeacherLogin() {
  const [username, setUsername] = useState("");
  const [errorusername, setErrorUsername] = useState("");
  const [errorpassword, setErrorPassword] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState(""); // "success" or "error"


  const navigate = useNavigate();

  const submithandle = async (e) => {

    let valid = true

    e.preventDefault();

    if (!username) {
      setErrorUsername("Username is required");
      hasError = false;

    } else if (username.length < 4 || username.length > 10) {
      setErrorUsername("Username must be 4–10 characters");
      hasError = false;
    }


    else {
      setErrorUsername("");
    };



    if ((password.length <= 7)) {
      setErrorPassword("password shouldn't be less than 8 characters");
      valid = false
    }

    else if (password.length > 10) {
      setErrorPassword("password shouldn't be higher than 10 characters");
      valid = false
    }

    else {
      setErrorPassword("");
    }

    // ❌ STOP if error
    if (!valid) {
      return
    };


    try {
      const res = await API.post("/login", {
        username: username,
        password: password,
      });
      // ✅ Save token
      localStorage.setItem("token", res.data.token);
      console.log(res);
      setStatus("success"); // ✅ success = green
      setResponse(res.data.message);
      setTimeout(() => {
        navigate("/teacherdashboard")
      }, 2000);

    }

    catch (err) {
      console.log(err);
      setStatus("error"); // ❌ error = red
      setResponse(err.response?.data?.message || "login failed");
    }

  }




  return (
    <div className='containerauth'>
      <div className='classic2'>
        <p className={status === "success" ? "successMsg" : "errorMsg"}>
          {response}
        </p>
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
