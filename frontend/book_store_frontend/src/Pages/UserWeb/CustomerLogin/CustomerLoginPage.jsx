import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import logo from './../../../assets/logo-21@2x.png'
import { useAuth } from "../../../hooks/AuthProvider"
import './CustomerLoginPage.css'

const CustomerLoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState({})

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput(values => ({...values, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(input)
    if(input.username !== "" & input.password !== "") {
      auth.loginCustomerAction(input);
      return
    }
    alert("Provide a valid input")
}


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
        <form className='credentials' onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Username</label>
            <input type="text" name='username' placeholder='Username' onChange={handleChange} required/>
          </div>
          <div className="input-box">
            <label>Password</label>
            <input type="password" name='password' placeholder='Password' onChange={handleChange} required/>
          </div>
          <div className='remember-forgot'> 
            <label><input type="checkbox"/>Remember me</label>
            <a href="#">Forgot Password</a>
          </div>          
          <button type="submit">Login</button>
        </form>
        <div className='register-link'>
          <p>Don't have an account ? <a href="/register">Register</a></p>
        </div>
      </div>
    </div>

  )
}

export default CustomerLoginPage
