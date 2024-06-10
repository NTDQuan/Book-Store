import React, { useState } from 'react'
import logo from './../../../assets/logo-21@2x.png'
import { registerUser } from '../../../service/AuthService'
import './CustomerRegistration.css'

const CustomerRegistration = () => {
    const [input, setInput] = useState({})

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInput(values => ({...values, [name]: value}))
      }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(input)
        try {
            await registerUser(input);
            console.log('Customer created successfully');
        } catch (error) {
            console.error("Error creating customer")
        }
    }

    return (
        <div className='customer-registration-page'>
        <div className='wrapper'>
          <div className='logo-container'>
            <img className='logo' loading='lazy' alt='' src={logo} />
            <h1>Registration</h1>
          </div>
          <form className='credentials' onSubmit={handleSubmit}>
            <div className='input-box'>
              <label>Username</label>
              <input type='text' name='username' placeholder='Username' onChange={handleChange} required />
            </div>
            <div className='input-box'>
              <label>Password</label>
              <input type='password' name='password' placeholder='Password' onChange={handleChange} required />
            </div>
            <div className='input-box'>
              <label>Confirm Password</label>
              <input type='password' name='confirmPassword' placeholder='Password' onChange={handleChange} required />
            </div>
            <div className='input-box'>
              <label>Full name</label>
              <input type='text' name='fullName' placeholder='Full name' onChange={handleChange} required />
            </div>
            <div className='input-box'>
              <label>Birth date</label>
              <input type='date' name='birthDate' onChange={handleChange} required />
            </div>
            <div className='input-box'>
              <label>Phone number</label>
              <input type='tel' name='phoneNumber' placeholder='Phone number' onChange={handleChange} required />
            </div>
            <div className='input-box'>
              <label>Address</label>
              <input type='text' name='address' placeholder='Address' onChange={handleChange} required />
            </div>
            <button type='submit'>Create new account</button>
          </form>
          <div className='login-link'>
            <p>
              Already have one? <a href='/login'>Login</a>
            </p>
          </div>
        </div>
      </div>
  )
}

export default CustomerRegistration
