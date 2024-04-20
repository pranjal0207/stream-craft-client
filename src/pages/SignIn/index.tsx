import "./index.css"

import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogin } from './reducer';
import { StreamCraftState } from "../../store";

import * as client from "./client";


const AuthenticationPage = () => {
    const currentToken = useSelector((state: StreamCraftState) => state.authReducer.token)
    const currentUser = useSelector((state: StreamCraftState) => state.authReducer.user);

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
        <>
            {currentToken === "" ? (
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
                        <div className="signup-prompt">
                            Don't have an account yet? <Link to="/register">Create Account</Link>
                        </div>
                    </form>
                </div>
                </div>
            ) : (
                <div className='login-container'>
                    <div className="login-form">
                        <h1> You are already Signed In!!</h1>
                        <h3> Signed In with email : {currentUser.email}</h3>
                    </div>
                </div>
            )}
        </>
    );
};

export default AuthenticationPage;