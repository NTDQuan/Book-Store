import React from 'react'
import CustomerSearchBar from '../SearchBar/CustomerSearchBar'
import CustomerLoginButton from '../LoginButton/CustomerLoginButton'
import CustomerLogoutButton from '../LogoutButton/CustomerLogoutButton'
import { useAuth } from "../../../hooks/AuthProvider"
import './CustomerHeader.css'

const CustomerHeader = () => {
  const { getCurrentCustomer } = useAuth();
  const isUserLoggedIn = !!getCurrentCustomer();
  return (
    <div className='customer-header'>
      <div className='customer-search-bar'>
        <CustomerSearchBar />
      </div>
      <div className='customer-login-or-avatar'>
        {isUserLoggedIn ? ( 
          <CustomerLogoutButton />
        ) : (
          <CustomerLoginButton /> 
        )}
      </div>
    </div>
  )
}

export default CustomerHeader
