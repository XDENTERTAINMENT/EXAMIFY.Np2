import { useNavigate } from "react-router-dom";
import React from "react";
// import "./auth.css"
import { useState } from "react";
import API from "../../services/api";
import GoogleLoginBtn from "../../components/GoogleLoginBtn";
import "./studentsignup.css";

function StudentLogin() {
  const [username, setUsername] = useState("");
  const [errorusername, setErrorUsername] = useState("");
  const [errorpassword, setErrorPassword] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submithandle = async (e) => {
    let valid = true;

    e.preventDefault();

    if (!username) {
      setErrorUsername("Username is required");
      valid = false;
      setTimeout(() => {
        setErrorUsername("");
      }, 3000);
    } else if (username.length < 4 || username.length > 10) {
      setErrorUsername("Username must be 4–10 characters");
      valid = false;
      setTimeout(() => {
        setErrorUsername("");
      }, 3000);
    } else {
      setErrorUsername("");
    }

    if (!password) {
      setErrorPassword("password is required");
      valid = false;
      setTimeout(() => {
        setErrorPassword("");
      }, 3000);
    } else if (password.length < 8 || password.length > 10) {
      setErrorPassword("Password should be 8–10 character long");
      valid = false;
      setTimeout(() => {
        setErrorPassword("");
      }, 3000);
    } else {
      setErrorPassword("");
    }

    // ❌ STOP if error
    if (!valid) {
      return;
    }
    if (loading) return;
    setLoading(true);

    try {
      const res = await API.post("/auth/Studentloginuser", {
        username: username,
        password: password,
      });
      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      
      setStatus("success"); // ✅ success = green
      setResponse(res.data.message);

      setTimeout(() => {
        navigate("/studentdashboard");
      }, 2000);

      setTimeout(() => {
        setResponse("");
      }, 3000);
    } catch (err) {
      console.log(err);
      setStatus("error"); // ❌ error = red
      setResponse(err.response?.data?.message || "login failed");
      setTimeout(() => {
        setResponse("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-containerall">
      <div className="login-card">
        {response && (
          <p className={status === "success" ? "success" : "error"}>
            {response}
          </p>
        )}

        {/* TOP */}
        <div className="login-top">
          <h2>Sign In</h2>
          <p>Login to continue to your dashboard</p>
        </div>

        {/* FORM */}
        <form className="login-form" onSubmit={submithandle}>
          {/* USERNAME */}
          <label htmlFor="UserName">
            <input
              type="text"
              placeholder="UserName"
              name="UserName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          {errorusername && <p className="error">{errorusername}</p>}

          {/* PASSWORD */}
          <label htmlFor="Password">
            <input
              type="Password"
              placeholder="Password"
              name="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {errorpassword && <p className="error">{errorpassword}</p>}

          {/* REMEMBER */}
          <div className="remember-box">
            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <span>Forgot Password?</span>
          </div>

          {/* BUTTON */}
          <button disabled={loading} type="submit" className="signup-btn">
            {loading ? "Loading..." : "lOGIN"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="login-divider">
          <span>OR</span>
        </div>

        {/* GOOGLE LOGIN */}
        <div className="google-login">
          <GoogleLoginBtn
           role="student"
            redirectTo="/studentdashboard"
            onSuccessMessage={(msg) => {
              setStatus("success");
              setResponse(msg);
               
            }}
             setloading={setLoading}
            onErrorMessage={(msg) => {
              setStatus("error");
              setResponse(msg);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
