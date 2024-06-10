import React, { useState, useEffect } from 'react';
import { getOrders, createOrder, deleteOrder } from '../../../service/OrderService';
import AddOrderModal from '../../../components/AdminPanel/AddModal/AddOrderModal/AddOrderModal';
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';
import './OrderListPage.css';

const OrderListPage = () => {
    const [orders, setOrders] = useState([]);
    const [addModalVisible, setAddModalVisible] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleAdd = async (newOrderData) => {
        try {
            await createOrder(newOrderData);
            setAddModalVisible(false);
            fetchOrders();
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const handleDelete = async (orderId) => {
        try {
            await deleteOrder(orderId);
            fetchOrders();
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleAddClick = () => {
        setAddModalVisible(true);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'status', headerName: 'Status', width: 100 },
        { field: 'totalAmount', headerName: 'Total Amount', width: 100 },
        { field: 'customerId', headerName: 'Customer Id', width: 100 },
        { field: 'bookIds', headerName: 'Book Id', width: 100 },
        { field: 'quantities', headerName: 'Quantity', width: 150 },
    ];

    return (
        <div className='order-list'>
            <div className='info'>
                <h1>Order List</h1>
                <button onClick={handleAddClick}>Add New Order</button>
            </div>
            <DataTable columns={columns} rows={orders} handleDelete={handleDelete} />
            {addModalVisible && (
                <AddOrderModal
                    visible={addModalVisible}
                    onCancel={() => setAddModalVisible(false)}
                    onSave={handleAdd}
                />
            )}
        </div>
    );
};

export default OrderListPage;
