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
          <span>User name</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
