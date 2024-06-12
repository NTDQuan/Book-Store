// import axios from "axios";

// const BASE_URL = "http://localhost:8080/admin/order-management";

// export const getOrders = async () => {
//   const response = await axios.get(BASE_URL);
//   return response.data;
// };

// export const createOrder = async (orderData) => {
//   const response = await axios.post(BASE_URL, orderData);
//   return response.data;
// };

// export const updateOrder = async (orderId, orderData) => {
//   const response = await axios.put(`${BASE_URL}/${orderId}`, orderData);
//   return response.data;
// };

// export const deleteOrder = async (orderId) => {
//   const response = await axios.delete(`${BASE_URL}/${orderId}`);
//   return response.data;
// };
import axios from "axios";

const baseURL = "http://localhost:8080/admin/order-management";

const getOrders = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    console.error("Error fetching order data:", error);
    throw error;
  }
};

const getOrderDataByID = async (orderId) => {
  try {
    const response = await axios.get(`${baseURL}/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order data with ID ${orderId}:`, error);
    throw error;
  }
};

const createOrder = async (orderData) => {
  try {
    const response = await axios.post(baseURL, orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

const updateOrder = async (orderId, orderData) => {
  try {
    const response = await axios.put(`${baseURL}/${orderId}`, orderData);
    return response.data;
  } catch (error) {
    console.error(`Error updating order with ID ${orderId}:`, error);
    throw error;
  }
};

const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${baseURL}/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting order with ID ${orderId}:`, error);
    throw error;
  }
};

export { getOrders, getOrderDataByID, createOrder, updateOrder, deleteOrder };
