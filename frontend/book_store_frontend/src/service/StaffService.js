import axios from "axios";

const baseURL = "http://localhost:8080/admin";

const getStaffs = async () => {
  try {
    const response = await axios.get(`${baseURL}/staffs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching staff data:", error);
    throw error;
  }
};

const getStaffDataByID = async (staffID) => {
  return axios.get(`${baseURL}/staffs/${staffID}`)
  .then(response => {
      if (response.status === 200) {
          console.log("fetch data")
          return response.data
      } else {
          throw new Error("Failed to fetch categories")
      }
          
  })
  .catch(error => {
      console.log(error)
      throw error;
  })
}

const createStaff = async (staffData) => {
  try {
    const response = await axios.post(baseURL, staffData);
    return response.data;
  } catch (error) {
    console.error("Error creating staff:", error);
    throw error;
  }
};

const updateStaff = async (staffId, updatedStaffData) => {
  try {
    const response = await axios.put(`${baseURL}/staffs/${staffId}`, updatedStaffData);
    return response.data;
  } catch (error) {
    console.error(`Error updating staff with ID ${staffId}:`, error);
    throw error;
  }
};

const deleteStaff = async (staffId) => {
  try {
    const response = await axios.delete(`${baseURL}/staffs/${staffId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting staff with ID ${staffId}:`, error);
    throw error;
  }
};



export { getStaffs, createStaff, updateStaff, deleteStaff, getStaffDataByID };
