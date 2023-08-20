import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/authContext';

import userService from '../../services/userService';
import './css/Login.css';
export default function Login() {
    // React States
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const auth = useAuth()
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();


        // alert(`Username : ${credentials.username} Password: ${credentials.password}`);

        // get the response from the server
        userService.login(credentials)
            .then((res) => {
                // console.log(res.data)

                // set user details in the context
                // auth.setUser(res.data.user);
                auth.setUsername(credentials.username)


                // store user token in local storage
                window.localStorage.setItem('token', res.data.token);

                // store user id in local storage
                window.localStorage.setItem('userId', res.data.user.id);


                if (res.data.user.role === 'restaurant owner') {
                    if (res.data.user.restaurantId === 'test101') {
                        navigate('/restaurantCreate');
                        return;

                    }
                    else {
                        window.localStorage.setItem('restaurantId', res.data.user.restaurantId);

                    }

                }

                // check the role of the logged in user
                // navigate to the dashboard accordingly either in restaurant owner or customer 
                if (res.data.user.role === 'customer') {
                    navigate('/customerDashboard');
                }
                else {
                    navigate('/ownerProfile');
                }
            })
            .catch((err) => {
                window.alert(err.response.data.error)
            })


    };



    // show login
    const renderLogin = (
        <div className="form">
            <form onSubmit={handleSubmit}>

                <div className="input-container-input">
                    <label>Username </label>
                    <input
                        data-testid="username-input"
                        id='username-input'
                        type="text"
                        name="username"
                        autoComplete='off'
                        placeholder='Enter username'
                        // value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        required />
                </div>
                <div className="input-container-input">
                    <label>Password </label>
                    <input
                        data-testid="userPassword-input"
                        id='userPassword-input'
                        type="password"
                        name="userPassword"
                        autoComplete='off'
                        placeholder='Enter password'
                        // value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        required />
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>

            </form>
        </div>
    );

    return (
        <div>
            <div className="app">
                <div className="login-form">
                    <div className="title">Welcome to Table Reservation System</div>
                    {
                        isSubmitted
                            ? <div className='success-div'>
                                User is successfully logged in. <button onClick={() => setIsSubmitted(false)}>Back</button>
                            </div>
                            : renderLogin
                    }
                    <br />

                    <div className='bottom-section'>
                        <p>Don't have an account ? </p>

                        <Link to={"/register"} className='bottom-button'>Register Now</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
