import React, { useState, useEffect } from 'react';
import { getBooksData } from '../../../../service/BookService';
import { getCustomers } from '../../../../service/CustomerService';
import './AddOrderModal.css';

const AddOrderModal = ({ visible, setAddModalVisible, onSave }) => {
  const [orderData, setOrderData] = useState({
    customerId: '',
    status: '',
    bookItems: [{ bookId: '', quantity: 1, price: 0 }]
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
    if (field === 'bookId') {
      const selectedBook = books.find(book => book.id === parseInt(value));
      newBookItems[index].price = selectedBook ? selectedBook.price : 0;
    }
    setOrderData({ ...orderData, bookItems: newBookItems });
  };

  const handleAddBookItem = () => {
    setOrderData({
      ...orderData,
      bookItems: [...orderData.bookItems, { bookId: '', quantity: 1, price: 0 }]
    });
  };

  const handleRemoveBookItem = (index) => {
    const newBookItems = orderData.bookItems.filter((_, i) => i !== index);
    setOrderData({ ...orderData, bookItems: newBookItems });
  };

  const calculateTotalPrice = () => {
    return orderData.bookItems.reduce((total, item) => {
      return total + item.price * item.quantity;
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
              value={orderData.customerId}
              onChange={(e) => setOrderData({ ...orderData, customerId: e.target.value })}
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
                value={item.bookId}
                onChange={(e) => handleBookItemChange(index, 'bookId', e.target.value)}
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
              {/* <label>Price</label>
              <input
                type="number"
                value={item.price}
                readOnly
              /> */}
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
