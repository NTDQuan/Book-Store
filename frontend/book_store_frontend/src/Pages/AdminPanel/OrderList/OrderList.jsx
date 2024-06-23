import React, { useEffect, useState } from 'react'
import { getOrders, confirmOrder, refuseOrder } from '../../../service/OrderService';
import './OrderList.css'

import { getBooksDataByID } from '../../../service/BookService'

const OrderList = () => {
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
      fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
          const data = await getOrders();
          // Lặp qua từng đơn hàng và lấy thông tin sách từ bookId
          const ordersWithBooks = await Promise.all(
            data.map(async (order) => {
              const orderItemsWithBooks = await Promise.all(
                order.orderItems.map(async (item) => {
                  const book = await getBooksDataByID(item.bookId);
                  return {
                    ...item,
                    bookName: book.title, // Thêm thông tin tên sách vào từng order item
                  };
                })
              );
              return {
                ...order,
                orderItems: orderItemsWithBooks,
              };
            })
          );
          setOrders(ordersWithBooks);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };

    const handleConfirmOrder = async (orderId) => {
        try {
        await confirmOrder(orderId);
        // Optionally, update the UI or show a success message
        fetchOrders(); // Refresh orders after confirming
        } catch (error) {
        console.error('Error confirming order:', error);
        // Optionally, handle error states or show an error message
        }
    };

    const handleRefuseOrder = async (orderId) => {
        try {
        await refuseOrder(orderId);
        // Optionally, update the UI or show a success message
        fetchOrders(); // Refresh orders after refusing
        } catch (error) {
        console.error('Error refusing order:', error);
        // Optionally, handle error states or show an error message
        }
    };

    return (
        <div className='admin-order-list'>
        <div className='admin-order-list-container'>
            <div className='admin-order-list-content'>
                <div className='admin-order-list-order'>
                <div className='admin-order-list-order-id'>
                    <p>Order ID</p>
                </div>
                <div className='admin-order-list-order-date'>
                    <p>Order Date</p>
                </div>
                <div className='admin-order-list-order-item'>
                    <p>Order contain</p>
                </div>
                <div className='admin-order-list-order-customer'>
                    <p>Customer id</p>
                </div>
                <div className='admin-order-list-order-staff'>
                    <p>Staff id</p>
                </div>
                <div className='admin-order-list-order-info'>
                    <p>Order Info</p>
                </div>
                <div className='admin-order-list-order-price'>
                    <p>Total Price</p>
                </div>
                <div className='admin-order-list-order-status'>
                    <p>Status</p>
                </div>
                </div>       
                {orders.map((order) => (
                <div key={order.id} className='admin-order-list-order'>
                    <div className='admin-order-list-order-id'>
                        <p>{order.id}</p>
                    </div>
                    <div className='admin-order-list-order-date'>
                        <p>{new Date(order.createdAt).toLocaleString().slice(0, 10)}</p>
                    </div>
                    <div className='admin-order-list-order-item'>
                        <ul>
                            {order.orderItems.map((item, index) => (
                            <li key={index}>
                                {item.bookName} x{item.quantity}
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div className='admin-order-list-order-customer'>
                        <p>{order.userId}</p>
                    </div>
                    <div className='admin-order-list-order-staff'>
                        <p>{order.staffId}</p>
                    </div>
                    <div className='admin-order-list-order-info'>
                        <p>{order.contactNumber}, {order.fullName}, {order.address}</p>
                    </div>
                    <div className='admin-order-list-order-price'>
                        <p>${order.totalPrice.toFixed(2)}</p>
                    </div>
                    <div className='admin-order-list-order-status'>
                        <p>{order.status}</p>
                    </div>
                    <div className='admin-order-list-order-action'>
                        {order.status === 'PENDING' && (
                            <>
                                <button className='confirm' onClick={() => handleConfirmOrder(order.id)}>Confirm</button>
                                <button className='cancel' onClick={() => handleRefuseOrder(order.id)}>Cancel</button>
                            </>
                        )}
                    </div>
                </div>
                ))}
            </div>
        </div>
        </div>
    )
}

export default OrderList
