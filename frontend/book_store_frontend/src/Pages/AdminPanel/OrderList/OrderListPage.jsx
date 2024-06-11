import React, { useState, useEffect } from 'react';
import DataTable from '../../../components/AdminPanel/DataTable/DataTable.jsx';
import { getOrdersData, deleteOrder, getOrderDataByID } from '../../../service/OrderService.js';
import AddOrderModal from '../../../components/AdminPanel/AddModal/AddOrderModal/AddOrderModal.jsx';
import EditOrderModal from '../../../components/AdminPanel/EditModal/EditOrderModal/EditOrderModal.jsx';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'customer_id',
    headerName: 'Customer_Id',
    width: 150,
    renderCell: (params) => params.row.customer.fullname,
  },
  {
    field: 'book_id',
    headerName: 'Book_Id',
    width: 150,
    renderCell: (params) => params.row.book.title,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 100,
  },
  {
    field: 'totalPrice',
    headerName: 'Total Price',
    width: 100,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 130,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
  },
];

const OrderListPage = () => {
  const [orderData, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getOrders = async () => {
    try {
      const data = await getOrdersData();
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const refreshOrders = () => {
    getOrders();
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      refreshOrders();
      alert('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      setSelectedOrder(await getOrderDataByID(id));
      setEditOpen(true);
    } catch (error) {
      console.error('Error fetching order data', error);
    }
  };

  return (
    <div className='orders'>
      <div className='info'>
        <h1>Orders</h1>
        <button onClick={() => setOpen(true)}>Add New Order</button>
      </div>
      <DataTable slug="orders" columns={columns} rows={orderData} handleDelete={handleDelete} handleEdit={handleEdit}/>
      {open && <AddOrderModal slug="order" setOpen={setOpen} refreshOrders={refreshOrders}/>}
      {editOpen && <EditOrderModal slug="order" setOpen={setEditOpen} refreshOrders={refreshOrders} params={selectedOrder}/>}
    </div>
  );
};

export default OrderListPage;
