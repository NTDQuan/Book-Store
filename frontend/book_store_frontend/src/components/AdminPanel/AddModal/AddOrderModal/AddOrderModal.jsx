import React, { useState, useEffect } from 'react';
import { getBooksData } from '../../../../service/BookService';
import { getCustomers } from '../../../../service/CustomerService';
import './AddOrderModal.css';

const AddOrderModal = ({ visible, setAddModalVisible, onSave }) => {
  const [orderData, setOrderData] = useState({
    customer: '',
    status: '',
    bookItems: [{ book: '', quantity: 1 }]
  });
  const [books, setBooks] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchCustomers();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getBooksData();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleBookItemChange = (index, field, value) => {
    const newBookItems = [...orderData.bookItems];
    newBookItems[index][field] = value;
    setOrderData({ ...orderData, bookItems: newBookItems });
  };

  const handleAddBookItem = () => {
    setOrderData({
      ...orderData,
      bookItems: [...orderData.bookItems, { book: '', quantity: 1 }]
    });
  };

  const handleRemoveBookItem = (index) => {
    const newBookItems = orderData.bookItems.filter((_, i) => i !== index);
    setOrderData({ ...orderData, bookItems: newBookItems });
  };

  const calculateTotalPrice = () => {
    return orderData.bookItems.reduce((total, item) => {
      const selectedBook = books.find(book => book.id === parseInt(item.book));
      return total + (selectedBook ? selectedBook.price * item.quantity : 0);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalPrice = calculateTotalPrice();
    onSave({ ...orderData, totalPrice });
  };

  if (!visible) return null;

  return (
    <div className="add-order-modal">
      <div className="modal-content">
        <h2>Add New Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Customer</label>
            <select
              value={orderData.customer}
              onChange={(e) => setOrderData({ ...orderData, customer: e.target.value })}
              required
            >
              <option value="">Select Customer</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>{customer.fullName}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              value={orderData.status}
              onChange={(e) => setOrderData({ ...orderData, status: e.target.value })}
              required
            >
              <option value="">Select Status</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          {orderData.bookItems.map((item, index) => (
            <div key={index} className="form-group book-item">
              <label>Book</label>
              <select
                value={item.book}
                onChange={(e) => handleBookItemChange(index, 'book', e.target.value)}
                required
              >
                <option value="">Select Book</option>
                {books.map(book => (
                  <option key={book.id} value={book.id}>{book.title}</option>
                ))}
              </select>
              <label>Quantity</label>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleBookItemChange(index, 'quantity', e.target.value)}
                min="1"
                required
              />
              <button type="button" onClick={() => handleRemoveBookItem(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddBookItem}>Add Book</button>
          <div className="form-group">
            <label>Total Price: {calculateTotalPrice()}</label>
          </div>
          <button type="submit">Save</button>
        </form>
        <button onClick={() => setAddModalVisible(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default AddOrderModal;
