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