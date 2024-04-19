import "./index.css"

import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from './reducer';

import * as client from "./client";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userType, setUserType] = useState('consumer');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();

            const response = await client.signIn({
                "email": email,
                "password": password
            }, userType.toLowerCase());
            dispatch(setLogin(response));
            navigate("/");
        } catch (error) {
            setErrorMessage("You may have entered the wrong email address or password or your account might be locked");
        }
    };
  
    return (
        <div className='login-container'>
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <h2 className='login-heading'>Login</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="user-type-selector">
                            <label htmlFor="userType">User Type:</label>
                            <select
                                id="userType"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                                required
                            >
                                <option value="consumer">Consumer</option>
                                <option value="uploader">Uploader</option>
                            </select>
                        </div>
                    <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setErrorMessage("");
                        }}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
        </div>
    );
};

export default LoginPage;