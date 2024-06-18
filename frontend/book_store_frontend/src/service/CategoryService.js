import axios from 'axios'
import authHeader from './AuthService'
const base_url = 'http://localhost:8080'

const withAuthHeader = (config) => {
  return {
      ...config,
      headers: {
          ...config.headers,
          ...authHeader()
      }
  };
};

export function getCategoriesData() {
    return axios.get(`${base_url}/public/categories`)
    .then(response => {
        if (response.status === 200) {
            console.log("fetch data")
            return response.data
        } else {
            throw new Error("Failed to fetch category")
        }
            
    })
    .catch(error => {
        console.log(error)
        throw error;
    })
}

export const getCategoryDataByID = async (categoryID) => {
  return axios.get(`${base_url}/public/categories/${categoryID}`)
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

export const addCategory = async (categoryData) => {
  try {
      const requestConfig = withAuthHeader({
          method: 'POST',
          url: `${base_url}/admin/new-category`,
          data: JSON.stringify(categoryData),
          headers: { 'Content-Type': 'application/json' }
      });
      const response = await axios(requestConfig);
      return response.data;
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
};

export const deleteCategory = async (categoryID) => {
  try {
      const response = await axios.delete(`${base_url}/admin/categories/${categoryID}`, withAuthHeader);
      if (!response.ok) {
          throw new Error('Network response was not ok' + response.statusText);
      }
  } catch(error) {
      console.log(error);
      throw error;
  }
}

export const updateCategory = async (categoryID, categoryData) => {
  try {
      const requestConfig = withAuthHeader({
          method: 'PUT',
          url: `${base_url}/admin/categories/${categoryID}`,
          data: JSON.stringify(categoryData),
          headers: { 'Content-Type': 'application/json' }
      });
      const response = await axios(requestConfig);
      return response.data;
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
};