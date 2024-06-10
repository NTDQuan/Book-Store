import React from 'react'
import logo from './../../../assets/logo-21@2x.png'
import './CustomerRegistration.css'

const CustomerRegistration = () => {
  return (
    <div>
      <div className='customer-registration-page'>
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
                <div className='input-box'>
                    <label>Username</label>
                    <input type="text" placeholder='Username' required/>
                </div>
                <div className="input-box">
                    <label>Password</label>
                    <input type="password" placeholder='Password' required/>
                </div>
                <div className="input-box">
                    <label>Confirm Password</label>
                    <input type="password" placeholder='Password' required/>
                </div>
                <div className="input-box">
                    <label>Full name</label>
                    <input type="text" placeholder='Full name' required/>
                </div>
                <div className="input-box">
                    <label>Birth date</label>
                    <input type="date" required/>
                </div>
                <div className="input-box">
                    <label>Phone number</label>
                    <input type="tel" placeholder='Phone number' required/>
                </div>
                <div className="input-box">
                    <label>Address</label>
                    <input type="text" placeholder='Address' required/>
                </div>
            </div>

            <button type="submit">Create new account</button>
            <div className='login-link'>
                <p>Already have one ? <a href='/login'>Login</a></p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerRegistration
