import React, { useState, useEffect } from 'react';
import { getStaffs, createStaff, updateStaff, deleteStaff } from '../../../service/FetchStaffData';
import AddStaffModal from '../../../components/AdminPanel/AddModal/AddStaffModal/AddStaffModal';
import EditStaffModal from '../../../components/AdminPanel/EditModal/EditStaffModal/EditStaffModal';
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';

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
      await createStaff(newStaffData);
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

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'full_name', headerName: 'Full Name', width: 200 },
    { field: 'birth_date', headerName: 'Birth Date', width: 150 },
    { field: 'phone_number', headerName: 'Phone Number', width: 150 },
    { field: 'address', headerName: 'Address', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEditClick(params.row)}>Edit</button>
          <button onClick={() => handleDelete(params.row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  const handleEditClick = (staff) => {
    setSelectedStaff(staff);
    setEditModalVisible(true);
  };

  const handleAddClick = () => {
    setAddModalVisible(true);
  };

  return (
    <div className='staff-list'>
      <div className='info'>
        <h1>Staff List</h1>
        <button onClick={handleAddClick}>Add New Staff</button>
      </div>
      <DataTable columns={columns} rows={staffs} />
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
          onSave={handleAdd}
          onCancel={() => setAddModalVisible(false)}
        />
      )}
    </div>
  );
};

export default StaffListPage;