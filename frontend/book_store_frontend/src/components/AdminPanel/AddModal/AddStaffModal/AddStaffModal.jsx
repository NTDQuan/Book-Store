import React, { useState } from 'react';
import './AddStaffModal.css';

const AddStaffModal = ({ setOpen }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    birth_date: '',
    phone_number: '',
    address: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gửi dữ liệu đến backend
    console.log(formData);
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="add-staff-modal">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>X</span>
        <h1>Add New Staff</h1>
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
          <button type="submit">Add Staff</button>
        </form>
      </div>
    </div>
  );
};

export default AddStaffModal;