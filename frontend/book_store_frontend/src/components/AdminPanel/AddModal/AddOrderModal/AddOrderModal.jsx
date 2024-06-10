import React, { useState, useEffect } from 'react';
import { createOrder } from '../../../../service/OrderService';
import { getCustomers } from '../../../../service/CustomerService';
import { getBooksData } from '../../../../service/BookService';
import './AddOrderModal.css';

const AddOrderModal = ({ visible, setVisible }) => {
    const [orderData, setOrderData] = useState({
        status: '',
        totalAmount: 0,
        customerName: '',
        bookItems: [{ bookId: '', quantity: '' }]
    });

    const [customers, setCustomers] = useState([]);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCustomers();
        fetchBooks();
        // Tính toán tổng số tiền khi có thay đổi về giá hoặc số lượng của các quyển sách
        const totalPrice = orderData.bookItems.reduce((acc, item) => {
            // Lấy giá của quyển sách từ state hoặc mặc định là 0 nếu không có giá
            const bookPrice = item.price || 0;
            // Tính tổng số tiền của từng quyển sách và cộng vào tổng số tiền
            return acc + (bookPrice * item.quantity);
        }, 0);
        // Cập nhật tổng số tiền vào state
        setOrderData((prev) => ({
            ...prev,
            totalAmount: totalPrice
        }));
    }, [orderData.bookItems]);

    const fetchCustomers = async () => {
        try {
            const customersData = await getCustomers();
            setCustomers(customersData);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const fetchBooks = async () => {
        try {
            const booksData = await getBooksData();
            setBooks(booksData);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBookChange = (e, index) => {
        const { name, value } = e.target;
        const updatedBookItems = [...orderData.bookItems];
        updatedBookItems[index][name] = value;
        setOrderData((prev) => ({
            ...prev,
            bookItems: updatedBookItems
        }));
    };

    // const handleAddBook = () => {
    //     setOrderData((prev) => ({
    //         ...prev,
    //         bookItems: [...prev.bookItems, { bookId: '', quantity: '' }]
    //     }));
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     try {
    //         await createOrder(orderData);
    //         setLoading(false);
    //         setOrderData({
    //             status: '',
    //             totalAmount: '',
    //             customerName: '',
    //             bookItems: [{ bookName: '', quantity: '' }]
    //         });
    //         alert('Order created successfully');
    //         setVisible(false);
    //     } catch (error) {
    //         console.error('Error creating order:', error);
    //         setLoading(false);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createOrder(orderData);
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    if (!visible) return null;

    return (
        <div className="add-order-modal">
            <div className="modal">
                <span className="close" onClick={() => setVisible(false)}>X</span>
                <h1>Add Order</h1>
                <form onSubmit={handleSubmit}>
                    <div className="item">
                        <label>Status</label>
                        <input
                            type="text"
                            name="status"
                            value={orderData.status}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                    </div>
                    <div className="item">
                        <label>Total Amount</label>
                        <input
                            type="number"
                            name="totalAmount"
                            value={orderData.totalAmount}
                            onChange={handleChange}
                            className="input"
                            disabled
                        />
                    </div>
                    <div className="item">
                        <label>Customer Name</label>
                        <select className='input' name='customer' required>
                        <option value="">Select author</option>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>{customer.fullName}</option>
                        ))}
                        </select>
                    </div>
                    {orderData.bookItems.map((book, index) => (
                        <div key={index}>
                            <div className="item">
                                <label>Book Name</label>
                                <select
                                    name="bookName"
                                    value={book.bookName}
                                    onChange={(e) => handleBookChange(e, index)}
                                    className="input"
                                    required
                                >
                                    <option value="">Select Book</option>
                                    {books.map(book => (
                                        <option key={book.id} value={book.id}>{book.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="item">
                                <label>Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={book.quantity}
                                    onChange={(e) => handleBookChange(e, index)}
                                    className="input"
                                    required
                                />
                            </div>
                        </div>
                    ))}
                    {/* <button type="button" onClick={handleAddBook}>Add Book</button> */}
                    <button type="submit" disabled={loading}>Add Order</button>
                </form>
            </div>
        </div>
    );
};

export default AddOrderModal;




