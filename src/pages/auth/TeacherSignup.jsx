import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
// import "./auth.css";
import API from "../../services/api";
import GoogleLoginBtn from "../../components/GoogleLoginBtn";
import "./teachers.css";

function TeacherSignup() {
  const [errorusername, setErrorUsername] = useState("");
  const [username, setUsername] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorpassword, setErrorPassword] = useState("");
  const [password, setPassword] = useState("");
  const [errorConfirmpassword, setErrorConfirmpassword] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role;

  const submithandle = async (e) => {
    e.preventDefault();

    // RESET ERRORS
    setErrorFirstName("");
    setErrorLastName("");
    setErrorUsername("");
    setErrorPassword("");
    setErrorConfirmpassword("");

    let hasError = true;

    // ✅ FIRST NAME
    if (!FirstName) {
      setErrorFirstName("First name is required");
      hasError = false;
      setTimeout(() => {
        setErrorFirstName("");
      }, 3000);
    } else if (FirstName.length < 4) {
      setErrorFirstName("First name must be at least 4 characters");
      hasError = false;
      setTimeout(() => {
        setErrorFirstName("");
      }, 3000);
    }

    // ✅ LAST NAME
    if (!LastName) {
      setErrorLastName("Last name is required");
      hasError = false;

      setTimeout(() => {
        setErrorLastName("");
      }, 3000);
    } else if (LastName.length < 4) {
      setErrorLastName("Last name must be at least 4 characters");
      hasError = false;
      setTimeout(() => {
        setErrorLastName("");
      }, 3000);
    }

    // ✅ USERNAME
    if (!username) {
      setErrorUsername("Username is required");
      hasError = false;
      setTimeout(() => {
        setErrorUsername("");
      }, 3000);
    } else if (username.length < 4 || username.length > 10) {
      setErrorUsername("Username must be 4–10 characters");
      hasError = false;
      setTimeout(() => {
        setErrorUsername("");
      }, 3000);
    }

    // ✅ PASSWORD
    if (!password) {
      setErrorPassword("Password is required");
      hasError = false;
      setTimeout(() => {
        setErrorPassword("");
      }, 3000);
    } else if (password.length < 8 || password.length > 10) {
      setErrorPassword("Password must be 8–10 characters");
      hasError = false;
      setTimeout(() => {
        setErrorPassword("");
      }, 3000);
    }

    // ✅ CONFIRM PASSWORD
    if (!Confirmpassword) {
      setErrorConfirmpassword("Confirm your password");
      hasError = false;
      setTimeout(() => {
        setErrorConfirmpassword("");
      }, 3000);
    } else if (password !== Confirmpassword) {
      setErrorConfirmpassword("Passwords do not match");
      setTimeout(() => {
        setErrorConfirmpassword("");
      }, 3000);
      hasError = false;
    }

    // ❌ STOP if error
    if (!hasError) return;
    if (loading) return;

    setLoading(true);

    // ✅ SEND TO BACKEND
    try {
      const res = await API.post("/auth/signup", {
        firstname: FirstName,
        lastname: LastName,
        username: username,
        password: password,
        role: "teacher",
      });

      setStatus("success"); // ✅ success = green
      setResponse(res.data.message);
      setTimeout(() => {
        navigate("/teacherlogin");
      }, 2000);
      setTimeout(() => {
        setResponse("");
      }, 3000);
    } catch (err) {
      console.log(err);

      setStatus("error"); // ❌ error = red
      setResponse(err.response?.data?.message || "Signup failed. Try again.");
      setTimeout(() => {
        setResponse("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-section">
      {/* LEFT SIDE */}
      <div className="signup-left">
        <div className="overlay"></div>

        <div className="left-content">
          <span className="tag">Teacher Assessment Platform</span>

          <h1>
            Build & Manage <br />
            Exams Easily 📚
          </h1>

          <p>
            Create quizzes, monitor student performance, and manage assessments
            with a modern platform built for educators.
          </p>

          <div className="features">
            <div className="feature-box">
              <i className="fa-solid fa-file-circle-plus"></i>
              <span>Create Smart Exams</span>
            </div>

            <div className="feature-box">
              <i className="fa-solid fa-chart-pie"></i>
              <span>Track Student Progress</span>
            </div>

            <div className="feature-box">
              <i className="fa-solid fa-user-shield"></i>
              <span>Secure Exam Environment</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="signup-right">
        <div className="form-container">
          {response && (
            <p className={status === "success" ? "success" : "error"}>
              {response}
            </p>
          )}

          <h2>Teacher Sign Up</h2>

          <p className="sub-text">
            Create your educator account to get started.
          </p>

          <form onSubmit={submithandle}>
            {/* FIRST NAME */}
            <div className="input-group">
              <label htmlFor="FirstName">First Name</label>

              <input
                type="text"
                placeholder="Enter first name"
                name="FirstName"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              {errorFirstName && <p className="error">{errorFirstName}</p>}
            </div>

            {/* LAST NAME */}
            <div className="input-group">
              <label htmlFor="LastName">Last Name</label>

              <input
                type="text"
                placeholder="Enter last name"
                name="LastName"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              {errorLastName && <p className="error">{errorLastName}</p>}
            </div>

            {/* USERNAME */}
            <div className="input-group">
              <label htmlFor="UserName">Username</label>

              <input
                type="text"
                placeholder="Enter username"
                name="UserName"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              {errorusername && <p className="error">{errorusername}</p>}
            </div>

            {/* PASSWORD */}
            <div className="input-group">
              <label htmlFor="Password">Password</label>

              <input
                type="password"
                placeholder="Enter password"
                name="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {errorpassword && <p className="error">{errorpassword}</p>}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="input-group">
              <label htmlFor="ConfirmPassword">Confirm Password</label>

              <input
                type="password"
                placeholder="Confirm password"
                name="ConfirmPassword"
                value={Confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />

              {errorConfirmpassword && (
                <p className="error">{errorConfirmpassword}</p>
              )}
            </div>

            {/* BUTTON */}
            <button disabled={loading} type="submit" className="signup-btn">
              {loading ? "Loading..." : "Signup"}
            </button>

            {/* DIVIDER */}
            <div className="divider">
              <span>OR</span>
            </div>

            {/* GOOGLE LOGIN */}
            <div className="google-login">
              <GoogleLoginBtn redirectTo="/teacherlogin" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TeacherSignup;
