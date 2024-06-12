import axios from 'axios'

const base_url = 'http://localhost:8080'

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
      const response = await fetch(`${base_url}/admin/new-category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

export const deleteCategory = async (categoryID) => {
    try {
        const response = await fetch(`${base_url}/admin/categories/${categoryID}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }
    } catch(error) {
        console.log(error)
        throw error;
    }
}

export const updateCategory = async (categoryID, categoryData) => {
  try {
    const response = await fetch(`${base_url}/admin/categories/${categoryID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok' + response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};