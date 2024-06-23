import axios from "axios";
import authHeader from './AuthService'

const baseURL = "http://localhost:8080/admin";

const withAuthHeader = (config) => {
  return {
      ...config,
      headers: {
          ...config.headers,
          ...authHeader()
      }
  };
};

const getCustomers = async () => {
  try {
    const response = await axios.get(`${baseURL}/customers`, withAuthHeader({}));
    return response.data;
  } catch (error) {
    console.error("Error fetching customer data:", error);
    throw error;
  }
};

const getCustomerDataByID = async (customerID) => {
  try {
    const response = await axios.get(`${baseURL}/customers/${customerID}`, withAuthHeader({}));
    return response.data;
  } catch (error) {
    console.error("Error fetching customer data:", error);
    throw error;
  }
};

const createCustomer = async (customerData) => {
  try {
    const response = await axios.post(`${baseURL}/customers`, customerData, withAuthHeader({}));
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

const updateCustomer = async (customerId, updatedCustomerData) => {
  try {
    const response = await axios.put(
      `${baseURL}/customers/${customerId}`,
      updatedCustomerData,
      withAuthHeader()
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating customer with ID ${customerId}:`, error);
    throw error;
  }
};

const deleteCustomer = async (customerId) => {
  try {
    const response = await axios.delete(`${baseURL}/customers/${customerId}`, withAuthHeader({}));
    return response.data;
  } catch (error) {
    console.error(`Error deleting customer with ID ${customerId}:`, error);
    throw error;
  }
};

export { getCustomers, createCustomer, updateCustomer, deleteCustomer, getCustomerDataByID };
