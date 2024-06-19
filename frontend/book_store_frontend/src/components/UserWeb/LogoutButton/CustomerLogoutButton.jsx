import React from 'react'
import { useAuth } from '../../../hooks/AuthProvider'

const CustomerLogoutButton = () => {
    const { customerLogOut } = useAuth();
    const handleLogoutClick = () => {
        customerLogOut();
    };
    
    return (
        <div className='customer-login-button-container'>
          <button onClick={handleLogoutClick}>Logout</button>     
        </div>
     )
}

export default CustomerLogoutButton
