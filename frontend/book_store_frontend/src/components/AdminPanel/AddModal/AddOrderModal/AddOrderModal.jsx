import React, { useState, useEffect } from 'react';
import './AddOrderModal.css';
import { addOrder } from '../../../../service/OrderService';
import { getCustomers } from '../../../../service/CustomerService';
import { getBooksData } from '../../../../service/BookService';

const AddOrderModal = ({ setOpen, refreshOrders }) => {
  const [orderData, setOrderData] = useState({
    customer_id: '', 
    book_id: '', 
    quantity: 1,
  });
  const [customers, setCustomers] = useState([]);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const customerData = await getCustomers();
        setCustomers(customerData);
      } catch (err) {
        console.error('Failed to fetch customers', err);
      }
    };

    const loadBooks = async () => {
      try {
        const bookData = await getBooksData();
        setBooks(bookData);
      } catch (err) {
        console.error('Failed to fetch books', err);
      }
    };

    loadCustomers();
    loadBooks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addOrder(orderData);
      refreshOrders();
      setOpen(false);
    } catch (err) {
      console.error('Failed to add order', err);
    }
  };

  return (
    <div className="addOrderModal">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>X</span>
        <h1>Add New Order</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>{'Customer'}</label>
            <select
              className="input"
              name="customer_id"
              value={orderData.customer_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Customer</option>
                {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                        {customer.fullName}
                    </option>
                ))}
            </select>
          </div>
          <div className="item">
            <label>Book</label>
            <select
              className="input"
              name="book_id"
              value={orderData.book_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Book</option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>
          <div className="item">
            <label>Quantity</label>
            <input
              type="number"
              className="input"
              name="quantity"
              value={orderData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Add Order</button>
        </form>
      </div>
    </div>
  );
};

export default AddOrderModal;

