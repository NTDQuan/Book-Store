import React from 'react'
import { useNavigate } from 'react-router-dom';
import './CustomerLoginButton.css'

const CustomerLoginButton = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className='customer-login-button-container'>
      <button onClick={handleLoginClick}>Login</button>     
    </div>
  )
}

export default CustomerLoginButton
