import React, { useState } from 'react';
import './AddStaffModal.css';

const AddStaffModal = ({ visible, setAddModalVisible, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    phoneNumber: '',
    address: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send data to backend
    onSave(formData);
    setAddModalVisible(false);
    alert('Staff added successfully')
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
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
            <button type="submit">Add Staff</button>
          </form>
        </div>
      </div>
    )
  );
};

export default AddStaffModal;