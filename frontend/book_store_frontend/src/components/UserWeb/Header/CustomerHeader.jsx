import React from 'react'
import CustomerSearchBar from '../SearchBar/CustomerSearchBar'
import CustomerLoginButton from '../LoginButton/CustomerLoginButton'
import './CustomerHeader.css'

const CustomerHeader = () => {
  return (
    <div className='customer-header'>
      <div className='customer-search-bar'>
        <CustomerSearchBar />
      </div>
      <div className='customer-login-or-avatar'>
        <CustomerLoginButton />
      </div>
    </div>
  )
}

export default CustomerHeader
