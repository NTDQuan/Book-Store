import axios from 'axios'

export function getAuthorsData() {
    return axios.get('http://localhost:8080/admin/author-managerment/authors')
    .then(response => {
        if (response.status === 200) {
            console.log("fetch data")
            return response.data
        } else {
            throw new Error("Failed to fetch authors")
        }
            
    })
    .catch(error => {
        console.log(error)
        throw error;
    })
}

export const addAuthor = async (authorData) => {
    try {
      const response = await fetch('http://localhost:8080/admin/author-managerment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authorData),
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

export const deleteAuthor = async (authorID) => {
    try {
        const response = await fetch(`http://localhost:8080/admin/author-managerment/authors/${authorID}`, {
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