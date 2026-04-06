import React from 'react'
import "./auth.css"
import { useNavigate, } from 'react-router-dom';
import { useState } from 'react';
import API from '../../services/api';

function StudentSignup() {
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

    const navigate = useNavigate();

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
        } else if (FirstName.length < 4) {
            setErrorFirstName("First name must be at least 4 characters");
            hasError = false;
        }

        // ✅ LAST NAME
        if (!LastName) {
            setErrorLastName("Last name is required");
            hasError = false;
        } else if (LastName.length < 4) {
            setErrorLastName("Last name must be at least 4 characters");
            hasError = false;
        }

        // ✅ USERNAME
        if (!username) {
            setErrorUsername("Username is required");
            hasError = false;
        } else if (username.length < 4 || username.length > 10) {
            setErrorUsername("Username must be 4–10 characters");
            hasError = false;
        }

        // ✅ PASSWORD
        if (!password) {
            setErrorPassword("Password is required");
            hasError = false;
        } else if (password.length < 8 || password.length > 10) {
            setErrorPassword("Password must be 8–10 characters");
            hasError = false;
        }

        // ✅ CONFIRM PASSWORD
        if (!Confirmpassword) {
            setErrorConfirmpassword("Confirm your password");
            hasError = false;
        } else if (password !== Confirmpassword) {
            setErrorConfirmpassword("Passwords do not match");
            hasError = false;
        }

        // ❌ STOP if error
        if (!hasError) return;

        // ✅ SEND TO BACKEND
        try {
            const res = await API.post("/signup", {
                firstname: FirstName,
                lastname: LastName,
                username: username,
                password: password,


            });

            console.log(res);

            alert(res.data.message);
            navigate("/studentlogin");

        } catch (err) {
            console.log(err);

            alert(
                err.response?.data?.message ||
                "Signup failed. Try again."
            );
        }
    };






    return (
        <div className='containerauth'>
            <div className='classicform2'>
                <p> Sign Up</p>
                <form onSubmit={submithandle}>
                    <div>
                        <label htmlFor="FirstName">
                            <input type='text'
                                placeholder='FirstName'
                                name='FirstName'
                                value={FirstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </label>
                        <p className='error'>{errorFirstName}</p>
                    </div>
                    <div>
                        <label htmlFor="LastName">
                            <input type='text'
                                placeholder='LastName'
                                name='LastName'
                                value={LastName}
                                onChange={(e) => setLastName(e.target.value)}

                            />
                        </label>
                        <p className='error'>{errorLastName}</p>
                    </div>

                    <div>
                        <label htmlFor="UserName">
                            <input type='text'
                                placeholder='UserName'
                                name='UserName'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}

                            />
                        </label>
                        <p className='error'>{errorusername}</p>
                    </div>


                    <div>
                        <label htmlFor="Password">
                            <input type='Password'
                                placeholder='Password'
                                name='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                            />
                        </label>
                        <p className='error'>{errorpassword}</p>
                    </div>



                    <div>
                        <label htmlFor="Confirm Password">
                            <input type='Password'
                                placeholder='Confirm Password'
                                name='ConfirmPassword'
                                value={Confirmpassword}
                                onChange={(e) => setConfirmpassword(e.target.value)}
                            />
                        </label>
                        <p className='error'>{errorConfirmpassword}</p>
                    </div>

                    <button type='submit'>Sign up</button>
                </form>


            </div>
        </div>

    )
}

export default StudentSignup
