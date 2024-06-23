import React, { useEffect, useState } from 'react'
import './OrderList.css'
import { getCustomerOrder } from '../../../service/OrderService';
import { getBooksDataByID } from '../../../service/BookService'

const OrderList = () => {
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
      fetchOrders();
    }, []);
  
    const fetchOrders = async () => {
      try {
        const data = await getCustomerOrder();
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

    const getStatusClass = (status) => {
        switch (status) {
          case 'REFUSED':
            return 'order-status-refused';
          case 'CONFIRMED':
            return 'order-status-confirmed';
          case 'PENDING':
            return 'order-status-pending';
          default:
            return '';
        }
    };
  
    return (
      <div className='order-list'>
        <div className='order-list-container'>
          <div className='order-list-content'>
            <div className='order-list-order'>
              <div className='order-list-order-id'>
                <p>Order ID</p>
              </div>
              <div className='order-list-order-date'>
                <p>Order Date</p>
              </div>
              <div className='order-list-order-item'>
                <p>Order contain</p>
              </div>
              <div className='order-list-order-info'>
                <p>Order Info</p>
              </div>
              <div className='order-list-order-price'>
                <p>Total Price</p>
              </div>
              <div className='order-list-order-status'>
                <p>Status</p>
              </div>
            </div>
            {orders.map((order) => (
              <div key={order.id} className='order-list-order'>
                <div className='order-list-order-id'>
                  <p>{order.id}</p>
                </div>
                <div className='order-list-order-date'>
                  <p>{new Date(order.createdAt).toLocaleString().slice(0, 10)}</p>
                </div>
                <div className='order-list-order-item'>
                  <ul>
                    {order.orderItems.map((item, index) => (
                      <li key={index}>
                        {item.bookName} x{item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='order-list-order-info'>
                  <p>{order.contactNumber}, {order.fullName}, {order.address}</p>
                </div>
                <div className='order-list-order-price'>
                  <p>${order.totalPrice.toFixed(2)}</p>
                </div>
                <div className={`order-list-order-status ${getStatusClass(order.status)}`}>
                  <p>{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

export default OrderList
