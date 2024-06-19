import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as HomeIcon } from '../../../assets/home_icon.svg';
import { ReactComponent as SearchIcon } from '../../../assets/search_icon.svg';
import logo from '../../../assets/logo-21@2x.png'
import './CustomerNavBar.css'

const CustomerNavBar = () => {
  return (
    <div className='customer-navbar'>
      <div className='logo-container'>
        <img src={logo} alt='' />
      </div>
      <div className='tab'>
        <Link to="/" className='listItem'>
          <HomeIcon className='listItemIcon'/>
          <span className='listItemTitle'>Home</span>
        </Link>
        <Link to="/books" className='listItem'>
          <SearchIcon className='listItemIcon'/>
          <span className='listItemTitle'>Search</span>
        </Link>
      </div>
    </div>
  )
}

export default CustomerNavBar
