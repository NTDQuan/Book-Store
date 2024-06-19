import React, { useState } from 'react'
import default_avatar from '../../../assets/no-profile-picture.svg'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '../../../hooks/AuthProvider'

const Avatar = ({ className, src, alt }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { logOut } = useAuth();

  const handleLogout = () => {
    handleClose();
    logOut();
  };

  return (
    <div className="avatar-container">
      <img 
        id = "avatar"
        className={className} 
        src={src || default_avatar} 
        alt={alt} 
        onClick={handleClick} 
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'avatar',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Avatar
