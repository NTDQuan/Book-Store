import React, { useState } from 'react';
import './AddCustomerModal.css';

const AddCustomerModal = ({ setAddModalVisible, onSave }) => {
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
    console.log(formData)
    setAddModalVisible(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="add-customer-modal">
      <div className="modal">
        <span className="close" onClick={() => setAddModalVisible(false)}>X</span>
        <h1>Add New Customer</h1>
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
          <button type="submit">Add Customer</button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;
