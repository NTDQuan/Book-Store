import axios from 'axios';

const base_url = 'http://localhost:8080';

export const addToCart = async (userId, bookId, quantity, token) => {
    const url = `${base_url}/cart/${userId}/add`
    const data = {
        bookId: bookId,
        quantity: quantity
    };
    console.log("Bearer " + token)
    return axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        }
    });
};