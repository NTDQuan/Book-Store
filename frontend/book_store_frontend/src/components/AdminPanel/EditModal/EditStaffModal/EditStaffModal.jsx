import React, { useState, useEffect } from 'react';
import './EditStaffModal.css';

const EditStaffModal = ({ staff, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    full_name: staff.full_name,
    birth_date: staff.birth_date,
    phone_number: staff.phone_number,
    address: staff.address
  });

  useEffect(() => {
    setFormData({
      full_name: staff.full_name,
      birth_date: staff.birth_date,
      phone_number: staff.phone_number,
      address: staff.address
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
            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
          </div>
          <div className="item">
            <label>Birth Date</label>
            <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} />
          </div>
          <div className="item">
            <label>Phone Number</label>
            <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
          </div>
          <div className="item">
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditStaffModal;
