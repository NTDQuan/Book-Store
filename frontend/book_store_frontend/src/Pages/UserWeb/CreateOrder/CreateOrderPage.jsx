import React, { useState } from 'react'
import { createOrder } from '../../../service/OrderService.js';
import { useLocation } from 'react-router-dom';
import './CreateOrderPage.css'

const CreateOrderPage = (prps) => {
  const location = useLocation();
  const { totalPrice } = location.state || { totalPrice: 0 };

  const [formData, setFormData] = useState({
    fullName: '',
    contractNumber: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        ...formData
      };
      console.log(orderData);
      const response = await createOrder(orderData);
      console.log('Order created successfully:', response);
      // Redirect or show success message
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className='create-order-page'>
      <div className='create-order-container'>
         <div className='create-order-title'>
            <h1>Order detail</h1>
         </div>
         <div className='create-order-content'>
            <form className='create-order-form' onSubmit={handleSubmit}>
              <div className='create-order-form-content'>
                <label>Full name</label>
                <input type="text" name="fullName" onChange={handleChange} required/>
              </div>
              <div className='create-order-form-content'>
                <label>Contract number</label>
                <input type="tel" name="contractNumber" onChange={handleChange} required/>
              </div>
              <div className='create-order-form-content'>
                <label>Address</label>
                <input type="text" name="address" onChange={handleChange} required/>
              </div>
              <hr className='order-divider'></hr>
              <div className='create-order-total-price'>
                  <h1 className='total-price-title'>Total price</h1>
                  <h1 className='total-price'>${totalPrice}</h1>
              </div>
              <div className='create-order-button'>
                  <button type="submit">Confirm order</button>
              </div>
            </form>
         </div>

      </div>
    </div>
  )
}

export default CreateOrderPage
