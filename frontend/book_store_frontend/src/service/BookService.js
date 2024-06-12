import axios from 'axios'

const base_url = 'http://localhost:8080'

export function getBooksData() {
    return axios.get(`${base_url}/public/books`)
    .then(response => {
        if (response.status === 200) {
            console.log("fetch data")
            return response.data
        } else {
            throw new Error("Failed to fetch books")
        }
            
    })
    .catch(error => {
        console.log(error)
        throw error;
    })
}

export const addBook = async (bookData) => {
    try {
      const response = await fetch(`${base_url}/admin/new-book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
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

export const deleteBook = async (bookID) => {
    try {
        const response = await fetch(`${base_url}/books/${bookID}`, {
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

export const getBooksDataByID = async (bookID) => {
  return axios.get(`${base_url}/books/${bookID}`)
  .then(response => {
      if (response.status === 200) {
          console.log("fetch data")
          return response.data
      } else {
          throw new Error("Failed to fetch books")
      }
          
  })
  .catch(error => {
      console.log(error)
      throw error;
  })
}

export const updateBook = async (bookID, bookData) => {
    try {
      const response = await fetch(`${base_url}/books/${bookID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
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