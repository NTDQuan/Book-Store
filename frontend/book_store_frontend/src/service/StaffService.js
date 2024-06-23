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

const getStaffs = async () => {
  try {
    const response = await axios.get(`${baseURL}/staffs`, withAuthHeader({}));
    return response.data;
  } catch (error) {
    console.error("Error fetching staff data:", error);
    throw error;
  }
};

const getStaffDataByID = async (staffID) => {
  try {
    const response = await axios.get(`${baseURL}/staffs/${staffID}`, withAuthHeader({}));
    return response.data;
  } catch (error) {
    console.error("Error fetching staff data:", error);
    throw error;
  }
};

const createStaff = async (staffData) => {
  try {
    const response = await axios.post(`${baseURL}/staffs`, staffData, withAuthHeader({}));
    return response.data;
  } catch (error) {
    console.error("Error creating staff:", error);
    throw error;
  }
};

const updateStaff = async (staffId, updatedStaffData) => {
  try {
    const response = await axios.put(`${baseURL}/staffs/${staffId}`, updatedStaffData, withAuthHeader({}));
    return response.data;
  } catch (error) {
    console.error(`Error updating staff with ID ${staffId}:`, error);
    throw error;
  }
};

const deleteStaff = async (staffId) => {
  try {
    const response = await axios.delete(`${baseURL}/staffs/${staffId}`, withAuthHeader({}));
    return response.data;
  } catch (error) {
    console.error(`Error deleting staff with ID ${staffId}:`, error);
    throw error;
  }
};



export { getStaffs, createStaff, updateStaff, deleteStaff, getStaffDataByID };
