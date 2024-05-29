import axios from 'axios'

export function getCategoriesData() {
    return axios.get('http://localhost:8080/admin/category-managerment/categories')
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

export const addCategory = async (categoryData) => {
    try {
      const response = await fetch('http://localhost:8080/admin/category-managerment', {
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
        const response = await fetch(`http://localhost:8080/admin/category-managerment/categories/${categoryID}`, {
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