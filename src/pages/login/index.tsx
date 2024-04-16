import "./index.css"

import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { setLogin } from './reducer';
import { StreamCraftState } from '../../store';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();

    const user = useSelector((state: StreamCraftState) => state.loginreducer.user);
    const token = useSelector((state: StreamCraftState) => state.loginreducer.token);

    const BASE_API = process.env.REACT_APP_BACKEND_BASE_API;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            
            const response = await axios.post(`${BASE_API}/login/`, {
                "email": email,
                "password": password
            });

            dispatch(
                setLogin(response.data)
            );

            console.log(`after : ${user}  .....  ${token}`)

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