import axios from 'axios'

const REST_API_BASE_URL = 'http://localhost:8080/admin/book-managerment/'

export function getBooksData() {
    return axios.get('http://localhost:8080/admin/book-managerment/books')
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

