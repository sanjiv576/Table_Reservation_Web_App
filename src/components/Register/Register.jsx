import React, { useState } from 'react';
import './css/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../../services/userService';

export default function Register() {

  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      window.alert('Password and Confirm Password does not match.');
      return;
    }

    const newUser = {
      fullName: fullName,
      contact: contact,
      email: email,
      role: role,
      username: username,
      password: password
    };
    console.log(newUser);
    userService.register(newUser)
      .then(res => {
        console.log(res.data)
        window.alert('Account has been registered successfully.');


        // reset
        setFullName('');
        setContact('');
        setRole('');
        setEmail('')
        setUsername('');
        setConfirmPassword('');
        setPassword('');

        // move to login
        navigate('/');
      })
      .catch(err => window.alert(err.response.data.error));


  };

  return (
    <div>
      <h1 className='welcome-title'>Welcome to Table Reservation System</h1>

      <div className='right-container'>
        <div className='right-content'>
          <div className="register-container">
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label data-testId="name-label-id" htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label data-testId="contact-label-id" htmlFor="contact">Contact</label>
                <input
                  type="text"
                  id="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label data-testId="email-label-id" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label data-testId="role-label-id" htmlFor="role">Role</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="restaurant owner">Restaurant Owner</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              <div className="form-group">
                <label data-testId="username-label-id" htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label data-testId="password-label-id" htmlFor="password">Password</label>
                <input
                  data-testId="password-id"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label data-testId="confirm-password-label-id" htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  data-testId="confirm-password-id"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button onClick={handleRegister} type="submit">Sign Up</button>
            </form>
            <br />

            <div className="bottom-body-container">
              <p data-testId="para-id">Already have an account ? </p>

              <Link to={"/"} className='login-link'>Login Now</Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}