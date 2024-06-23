import axios from "axios";
import authHeader from './AuthService'
import { authCustomerHeader } from './AuthService'

const baseURL = "http://localhost:8080";

const withAuthHeader = (config) => {
    return {
        ...config,
        headers: {
            ...config.headers,
            ...authHeader()
        }
    };
  };

  const withCustomerAuthHeader = (config) => {
    return {
        ...config,
        headers: {
            ...config.headers,
            ...authCustomerHeader()
        }
    };
  };

export const getOrders = async () => {
  try {
    const response = await axios.get(`${baseURL}/orders/admin/all-orders`, withAuthHeader({}));
    return response.data;
  } catch (error) {
    console.error("Error fetching order data:", error);
    throw error;
  }
};

export const getCustomerOrder = async () => {
    try {
        const response = await axios.get(`${baseURL}/orders/my-orders`, withCustomerAuthHeader({}));
        return response.data;
    } catch (error) {
        console.error("Error fetching order data:", error);
        throw error;
    }
};

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${baseURL}/orders/place-order`, orderData, withCustomerAuthHeader({}));
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};