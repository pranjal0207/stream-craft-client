import "./index.css"; 

import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from '../SignIn/reducer'; 

import * as client from "./client"; 

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');  
    const [lastName, setLastName] = useState('');  
    const [errorMessage, setErrorMessage] = useState('');
    const [channelDescription, setChannelDescription] = useState('');
    const [userType, setUserType] = useState('consumer');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const userDetails = userType === "consumer" ? {
                email: email,
                password: password,
                type: userType,
                firstName: firstName,
                lastName: lastName,
            } : {
                email: email,
                password: password,
                type: userType,
                firstName: firstName,
                lastName: lastName,
                description: channelDescription
            };

            const response = await client.signUp(userDetails, userType);
            dispatch(setLogin(response));
            navigate("/");
        } catch (error) {
            setErrorMessage("An error occurred during signup. Please try again.");
        }
    };
  
    return (
        <div className='login-container'>
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <h2 className='login-heading'>Register</h2>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="user-type-selector">
                        <label htmlFor="userType">User Type:</label>
                        <select
                            id="userType"
                            value={userType}
                            onChange={(e) => {
                                setUserType(e.target.value);
                                setChannelDescription("");
                            }}
                            required
                        >
                            <option value="consumer">Consumer</option>
                            <option value="uploader">Uploader</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
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
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrorMessage("");
                            }}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setErrorMessage("");
                            }}
                            required
                        />
                    </div>
                    {userType === 'uploader' && (
                        <div>
                            <label htmlFor="channelDescription">Channel Description:</label>
                            <textarea
                                id="channelDescription"
                                value={channelDescription}
                                onChange={(e) => setChannelDescription(e.target.value)}
                                placeholder="Describe your channel..."
                                rows= {4}  // You can adjust the size by changing the number of rows
                                required
                            />
                        </div>
                    )}
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
