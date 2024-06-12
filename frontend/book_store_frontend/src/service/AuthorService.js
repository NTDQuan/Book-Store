import axios from 'axios';

const base_url = 'http://localhost:8080';

export const getAuthorsData = () => {
    return axios.get(`${base_url}/public/authors`)
        .then(response => {
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error("Failed to fetch authors");
            }
        })
        .catch(error => {
            console.error("Error fetching authors:", error);
            throw error;
        });
};

export const getAuthorDataByID = async (authorID) => {
    try {
        const response = await axios.get(`${base_url}/public/authors/${authorID}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching author:", error);
        throw error;
    }
};

export const addAuthor = async (authorData) => {
    try {
        const response = await axios.post(`${base_url}/admin/new-author`, authorData);
        return response.data;
    } catch (error) {
        console.error("Error adding author:", error);
        throw error;
    }
};

export const deleteAuthor = async (authorID) => {
    try {
        const response = await axios.delete(`${base_url}/admin/authors/${authorID}`);
        if (response.status !== 204) {
            throw new Error("Failed to delete author");
        }
    } catch (error) {
        console.error("Error deleting author:", error);
        throw error;
    }
};

export const updateAuthor = async (authorID, authorData) => {
    try {
        const response = await axios.put(`${base_url}/admin/authors/${authorID}`, authorData);
        return response.data;
    } catch (error) {
        console.error("Error updating author:", error);
        throw error;
    }
};