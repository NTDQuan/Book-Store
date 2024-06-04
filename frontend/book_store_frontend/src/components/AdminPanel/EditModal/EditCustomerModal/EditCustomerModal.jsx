import React, { useState, useEffect } from 'react';
import { updateCustomer } from '../../../../service/CustomerService';
import './EditCustomerModal.css';

const EditCustomerModal = ({ visible, customer, onCancel, refresh }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    phoneNumber: '',
    address: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        fullName: customer.fullName,
        birthDate: customer.birthDate,
        phoneNumber: customer.phoneNumber,
        address: customer.address,
        username: customer.username,
        password: customer.password,
      });
    }
  }, [customer]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateCustomer(customer.id, formData);
      alert('Customer edited successfully');
      refresh();
      onCancel();
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    visible && (
      <div className="edit-customer-modal">
        <div className="modal">
          <span className="close" onClick={onCancel}>X</span>
          <h1>Edit Customer</h1>
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
              <input className='input' type="text" name="username" value={customer.username} onChange={handleChange} disabled={true} />
            </div>
            <div className="item">
              <label>Password</label>
              <input className='input' type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    )
  );
};

export default EditCustomerModal;