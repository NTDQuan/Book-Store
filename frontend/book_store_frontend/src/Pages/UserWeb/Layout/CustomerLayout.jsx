import React from 'react'
import CustomerNavBar from '../../../components/UserWeb/NavBar/CustomerNavBar'
import CustomerHeader from '../../../components/UserWeb/Header/CustomerHeader'
import { Outlet } from 'react-router-dom'
import './CustomerLayout.css'

const CustomerLayout = () => {
  return (
    <div className='customer-layout'>
      <div className='customer-navbar-container'>
        <CustomerNavBar />
      </div>
      <div className='customer-container'>
        <div className='customer-header-container'>
          <CustomerHeader />
        </div>
        <div className='customer-content-container'>
          <Outlet/>
        </div>
      </div>

    </div>
  )
}

export default CustomerLayout
