import React, { useState } from 'react';
import registerStaff from '../../../../service/AuthService';
import './AddStaffModal.css';

const AddStaffModal = ({ visible, setAddModalVisible, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    phoneNumber: '',
    address: '',
    username: '',
    password: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gửi dữ liệu đến backend
    onSave(formData);
    setAddModalVisible(false);
    alert('Staff added successfully')
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
<<<<<<< HEAD
    <div className="add-staff-modal">
      <div className="modal">
        <span className="close" onClick={() => setAddModalVisible(false)}>X</span>
        <h1>Add New Staff</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Full Name</label>
            <input className='input' type="text" name="fullName" value={formData.fullname} onChange={handleChange} />
          </div>
          <div className="item">
            <label>Birth Date</label>
            <input className='input' type="date" name="birthDate" value={formData.birthdate} onChange={handleChange} />
          </div>
          <div className="item">
            <label>Phone Number</label>
            <input className='input' type="text" name="phoneNumber" value={formData.phonenumber} onChange={handleChange} />
          </div>
          <div className="item">
            <label>Address</label>
            <input className='input' type="text" name="address" value={formData.address} onChange={handleChange} />
          </div>
          <button type="submit">Add Staff</button>
        </form>
=======
    visible && (
      <div className="add-staff-modal">
        <div className="modal">
          <span className="close" onClick={() => setAddModalVisible(false)}>X</span>
          <h1>Add New Staff</h1>
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label>Full Name</label>
              <input className='input' type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
            </div>
            <div className="item">
              <label>Birth Date</label>
              <input className='input' type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
            </div>
            <div className="item">
              <label>Phone Number</label>
              <input className='input' type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>
            <div className="item">
              <label>Address</label>
              <input className='input' type="text" name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div className="item">
              <label>Username</label>
              <input className='input' type="text" name="username" value={formData.username} onChange={handleChange} />
            </div>
            <div className="item">
              <label>Password</label>
              <input className='input' type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit">Add Staff</button>
          </form>
        </div>
>>>>>>> a361e26078890e2da368369e4ae9618d02da7ab5
      </div>
    </div>
  );
};

export default AddStaffModal;
