import React, { useState, useEffect } from 'react';
import './EditStaffModal.css';

const EditStaffModal = ({ visible, staff, onSave, onCancel }) => {
  const [formData, setFormData] = useState({

    fullName: '',
    birthDate: '',
    phoneNumber: '',
    address: ''
  });

  useEffect(() => {
    if (staff) {
      setFormData({
        fullName: staff.fullName,
        birthDate: staff.birthDate,
        phoneNumber: staff.phoneNumber,
        address: staff.address,
      });
    }
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
    visible && (
      <div className="editStaffModal">
        <div className="modal">
          <span className="close" onClick={onCancel}>X</span>
          <h1>Edit Staff</h1>
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
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    )
  );
};

export default EditStaffModal;