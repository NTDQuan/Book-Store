import axios from 'axios';
import { authCustomerHeader } from './AuthService';

const base_url = 'http://localhost:8080'

const withAuthHeader = (config) => {
    return {
      ...config,
      headers: {
        ...config.headers,
        ...authCustomerHeader()
      }
    };
  };

const getCart = async () => {
  try {
    const requestConfig = withAuthHeader({
      method: 'GET',
      url: `${base_url}/carts/user`
    });
    const response = await axios(requestConfig);
    return response.data;
  } catch (error) {
    console.error('Error getting cart:', error);
    throw error;
  }
};

const addToCart = async (bookId, quantity) => {
  try {
    const requestConfig = withAuthHeader({
      method: 'POST',
      url: `${base_url}/carts/items`,
      data: { bookId, quantity },
      headers: { 'Content-Type': 'application/json' }
    });
    const response = await axios(requestConfig);
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

const removeFromCart = async (cartItemId) => {
    try {
      const requestConfig = withAuthHeader({
        method: 'DELETE',
        url: `${base_url}/carts/items/${cartItemId}`,
      });
      const response = await axios(requestConfig);
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };
  
const updateCartItemQuantity = async (cartItemId, quantity) => {
    try {
        const requestConfig = withAuthHeader({
            method: 'PUT',
            url: `${base_url}/carts/items/${cartItemId}/quantity`,
            data: { quantity }, // Send quantity in the body
            headers: { 'Content-Type': 'application/json' },
        });
        const response = await axios(requestConfig);
        return response.data;
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        throw error;
    }
};

export { addToCart, getCart, updateCartItemQuantity, removeFromCart };
