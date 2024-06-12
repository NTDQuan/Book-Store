import React, { useState, useEffect } from 'react';
import { getStaffs, createStaff, updateStaff, deleteStaff, getStaffDataByID } from '../../../service/StaffService';
import AddStaffModal from '../../../components/AdminPanel/AddModal/AddStaffModal/AddStaffModal';
import EditStaffModal from '../../../components/AdminPanel/EditModal/EditStaffModal/EditStaffModal';
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';
import { registerStaff } from '../../../service/AuthService';
import './StaffListPage.css';

const StaffListPage = () => {
  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    try {
      const data = await getStaffs();
      setStaffs(data);
    } catch (error) {
      console.error('Error fetching staffs:', error);
    }
  };

  const handleEdit = async (updatedStaffData) => {
    try {
      await updateStaff(selectedStaff.id, updatedStaffData);
      setEditModalVisible(false);
      fetchStaffs();
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  const handleAdd = async (newStaffData) => {
    try {
      await registerStaff(newStaffData);
      setAddModalVisible(false);
      fetchStaffs();
    } catch (error) {
      console.error('Error creating staff:', error);
    }
  };

  const handleDelete = async (staffId) => {
    try {
      await deleteStaff(staffId);
      fetchStaffs();
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  const handleEditClick = async (staffId) => {
    try {
      const staff = await getStaffDataByID(staffId);
      setSelectedStaff(staff);
      setEditModalVisible(true);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

  const handleAddClick = () => {
    setAddModalVisible(true);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullName', headerName: 'Full Name', width: 200 },
    { field: 'birthDate', headerName: 'Birth Date', width: 150 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
    { field: 'address', headerName: 'Address', width: 200 },
  ];

  return (
    <div className='staff-list'>
      <div className='info'>
        <h1>Staff List</h1>
        <button onClick={handleAddClick}>Add New Staff</button>
      </div>
      <DataTable columns={columns} rows={staffs} handleDelete={handleDelete} handleEdit={handleEditClick}/>
      {editModalVisible && (
        <EditStaffModal
          visible={editModalVisible}
          staff={selectedStaff}
          onSave={handleEdit}
          onCancel={() => setEditModalVisible(false)}
        />
      )}
      {addModalVisible && (
        <AddStaffModal
          visible={addModalVisible}
          setAddModalVisible={setAddModalVisible}
          onSave={handleAdd}
        />
      )}
    </div>
  );
};

export default StaffListPage;