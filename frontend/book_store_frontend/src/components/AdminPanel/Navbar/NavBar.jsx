import React from 'react'
import logo from '../../../assets/logo.svg'
import notificationIcon from '../../../assets/notification.svg'
import Avatar from '../../General/Avatar/Avatar'
import { useAuth } from '../../../hooks/AuthProvider';
import './NavBar.css'

const NavBar = () => {
  const { user } = useAuth();
  return (
    <div className='navbar'>
      <div className='logo'>
        <img src={logo} alt="logo" />
        <span>ADMIN</span>
      </div>
      <div className='icons'>
        <div className='notification'>
          <img src={notificationIcon} alt=""/>
          <span>1</span>
        </div>
        <div className="user">
          <Avatar className="user"/>
        </div>
      </div>
    </div>
  )
}

export default NavBar
