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