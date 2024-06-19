<<<<<<< HEAD
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import notificationIcon from '../../../assets/notification.svg';
import Avatar from '../../General/Avatar/Avatar';
import './NavBar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xử lý logout ở đây
    // Ví dụ: Xóa token khỏi localStorage và điều hướng đến trang đăng nhập
    localStorage.removeItem('authToken');
    navigate('/admin/login');
  };

=======
import React from 'react'
import logo from '../../../assets/logo.svg'
import notificationIcon from '../../../assets/notification.svg'
import Avatar from '../../General/Avatar/Avatar'
import { useAuth } from '../../../hooks/AuthProvider';
import './NavBar.css'

const NavBar = () => {
  const { user } = useAuth();
>>>>>>> a361e26078890e2da368369e4ae9618d02da7ab5
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
        {/* Thêm nút Logout */}
        <div className="user">
          <Avatar className="user"/>
<<<<<<< HEAD
          <span>User name</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
=======
>>>>>>> a361e26078890e2da368369e4ae9618d02da7ab5
        </div>
      </div>
    </div>
  );
}

export default Navbar;
