import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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

    const navigate = useNavigate();

    const submithandle = (e) => {
        e.preventDefault;

        if(FirstName || LastName || username  >=10 ){

        }
        else if( FirstName || LastName || username <=3){

        }

        }





    return (
        <div className='containerauth'>
            <div className='classicform2'>
                <p> Sign Up</p>
                <form onSubmit={submithandle}>

                    <label htmlFor="FirstName">
                        <input type='text'
                            placeholder='FirstName'
                            name='FirstName'
                            value={FirstName}
                            onChange={(e)=> setFirstName(e.target.value)}
                        />
                    </label>
                    <p className='error'>{errorFirstName}</p>
                    <label htmlFor="LastName">
                        <input type='text'
                            placeholder='LastName'
                            name='LastName'
                            value={LastName}
                            onChange={(e)=> setLastName(e.target.value)}

                        />
                    </label>
                    <p className='error'>{errorLastName}</p>
                    <label htmlFor="UserName">
                        <input type='text'
                            placeholder='UserName'
                            name='UserName'
                            value={username}
                            onChange={(e)=> setUsername(e.target.value)}

                        />
                    </label>
                    <p className='error'>{errorusername}</p>

                    <label htmlFor="Password">
                        <input type='Password'
                            placeholder='Password'
                            name='Password'
                            value={password}
                            onChange={ (e)=>  setPassword(e.target.value)}

                        />
                    </label>
                    <p className='error'>{errorpassword}</p>
                    <label htmlFor="Confirm Password">
                        <input type='Password'
                            placeholder='Confirm Password'
                            name='ConfirmPassword'
                            value={Confirmpassword}
                            onChange={ (e)=>  setConfirmpassword(e.target.value)}
                        />
                    </label>
                    <p className='error'>{errorConfirmpassword}</p>
                    <button type='submit' >Sign up</button>
                </form>

            </div>
        </div>

    )
}

export default TeacherSignup
