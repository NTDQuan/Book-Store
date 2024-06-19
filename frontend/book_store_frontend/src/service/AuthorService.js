import axios from 'axios';
import authHeader from './AuthService'
const base_url = 'http://localhost:8080';

const withAuthHeader = (config) => {
    return {
        ...config,
        headers: {
            ...config.headers,
            ...authHeader()
        }
    };
};

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
        const requestConfig = withAuthHeader({
            method: 'POST',
            url: `${base_url}/admin/new-author`,
            data: authorData,
        });

        console.log('Request Header:', requestConfig.headers);
        console.log('Request Body:', authorData);

        const response = await axios(requestConfig);
        return response.data;
    } catch (error) {
        console.error("Error adding author:", error);
        throw error;
    }
};

export const deleteAuthor = async (authorID) => {
    try {
        const response = await axios.delete(`${base_url}/admin/authors/${authorID}`, withAuthHeader({}));
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
        const response = await axios.put(`${base_url}/admin/authors/${authorID}`, authorData, withAuthHeader({}));
        return response.data;
    } catch (error) {
        console.error("Error updating author:", error);
        throw error;
    }
};