import React, { useState, useEffect } from 'react';
import './EditStaffModal.css';

const EditStaffModal = ({ staff, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: staff.fullName,
    birthDate: staff.birthDate,
    phoneNumber: staff.phoneNumber,
    address: staff.address,
    username: staff.username,
    password: staff.password
  });

  useEffect(() => {
    setFormData({
      fullName: staff.fullName,
      birthDate: staff.birthDate,
      phoneNumber: staff.phoneNumber,
      address: staff.address,
      username: staff.username,
      password: staff.password
    });
  }, [staff]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="edit-staff-modal">
      <div className="modal">
        <span className="close" onClick={onCancel}>X</span>
        <h1>Edit Staff</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          </div>
          <div className="item">
            <label>Birth Date</label>
            <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
          </div>
          <div className="item">
            <label>Phone Number</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </div>
          <div className="item">
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
          </div>
          <div className="item">
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div className="item">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditStaffModal;
