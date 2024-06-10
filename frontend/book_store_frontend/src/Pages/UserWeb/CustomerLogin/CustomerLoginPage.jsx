import React, { useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import logo from './../../../assets/logo-21@2x.png'
import './CustomerLoginPage.css'

const CustomerLoginPage = () => {
  const navigate = useNavigate();

  const onButtonLoginClick = useCallback((event) => {
    event.preventDefault();
    navigate("/");
  }, [navigate]);

  return (
    <div className='CustomerLoginPage'>
      <div className='wrapper'>
        <div className='logo-container'>
          <img
            className='logo'
            loading='lazy'
            alt=''
            src={logo}
          />
          <h1>Welcome back</h1>
        </div>
        <div className='credentials'>
          <div className="input-box">
            <label>Username</label>
            <input type="text" placeholder='Username' required/>
          </div>
          <div className="input-box">
            <label>Password</label>
            <input type="password" placeholder='Password' required/>
          </div>
          <div className='remember-forgot'> 
            <label><input type="checkbox"/>Remember me</label>
            <a herf="#">Forgot Password</a>
          </div>          
        </div>

        <button type="submit">Login</button>
        <div className='register-link'>
          <p>Don't have an account ? <a href="/register">Register</a></p>
        </div>
      </div>
    </div>

  )
}

export default CustomerLoginPage
