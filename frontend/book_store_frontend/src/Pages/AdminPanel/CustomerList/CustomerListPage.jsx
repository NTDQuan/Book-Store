import React, { useState, useEffect } from 'react';
import { getCustomers, createCustomer, deleteCustomer, getCustomerDataByID } from '../../../service/CustomerService';
import AddCustomerModal from '../../../components/AdminPanel/AddModal/AddCustomerModal/AddCustomerModal';
import EditCustomerModal from '../../../components/AdminPanel/EditModal/EditCustomerModal/EditCustomerModal';
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';
import './CustomerListPage.css';

const CustomerListPage = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleAdd = async (newCustomerData) => {
    try {
      await createCustomer(newCustomerData);
      setAddModalVisible(false);
      fetchCustomers();
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  const handleDelete = async (customerId) => {
    try {
      await deleteCustomer(customerId);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleEditClick = async (customerId) => {
    try {
      const customer = await getCustomerDataByID(customerId);
      setSelectedCustomer(customer);
      setEditModalVisible(true);
    } catch (error) {
      console.error('Error fetching customer data:', error);
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
    { field: 'username', headerName: 'Username', width: 150 },
  ];

  return (
    <div className='customer-list'>
      <div className='info'>
        <h1>Customer List</h1>
        <button onClick={handleAddClick}>Add New Customer</button>
      </div>
      <DataTable columns={columns} rows={customers} handleDelete={handleDelete} handleEdit={handleEditClick} />
      {editModalVisible && (
        <EditCustomerModal
          visible={editModalVisible}
          customer={selectedCustomer}
          onCancel={() => setEditModalVisible(false)}
          refresh={fetchCustomers}
        />
      )}
      {addModalVisible && (
        <AddCustomerModal
          visible={addModalVisible}
          setAddModalVisible={setAddModalVisible}
          onSave={handleAdd}
        />
      )}
    </div>
  );
};

export default CustomerListPage;