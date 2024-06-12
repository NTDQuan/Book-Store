import axios from "axios";

const baseURL = "http://localhost:8080/admin";

const getCustomers = async () => {
  try {
    const response = await axios.get(`${baseURL}/customers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customer data:", error);
    throw error;
  }
};

const getCustomerDataByID = async (customerID) => {
  return axios.get(`${baseURL}/customers/${customerID}`)
  .then(response => {
      if (response.status === 200) {
          console.log("fetch data")
          return response.data
      } else {
          throw new Error("Failed to fetch customer")
      }
          
  })
  .catch(error => {
      console.log(error)
      throw error;
  })
}


const createCustomer = async (customerData) => {
  try {
    const response = await axios.post(`${baseURL}/customers`, customerData);
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
      updatedCustomerData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating customer with ID ${customerId}:`, error);
    throw error;
  }
};

const deleteCustomer = async (customerId) => {
  try {
    const response = await axios.delete(`${baseURL}/customers/${customerId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting customer with ID ${customerId}:`, error);
    throw error;
  }
};

export { getCustomers, createCustomer, updateCustomer, deleteCustomer, getCustomerDataByID };
