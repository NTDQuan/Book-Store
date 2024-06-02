import React, { useState, useEffect } from 'react';
import './EditStaffModal.css';

const EditStaffModal = ({ staff, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    fullname: staff.fullname,
    birthdate: staff.birthdate,
    phonenumber: staff.phonenumber,
    address: staff.address
  });

  useEffect(() => {
    setFormData({
      fullname: staff.fullname,
      birthdate: staff.birthdate,
      phonenumber: staff.phonenumber,
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
            <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} />
          </div>
          <div className="item">
            <label>Birth Date</label>
            <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
          </div>
          <div className="item">
            <label>Phone Number</label>
            <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleChange} />
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
