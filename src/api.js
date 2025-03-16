import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000';

const API = axios.create({
    baseURL: baseURL,
});

export const executeCode = async (sourceCode, language) => {
    try {
        const response = await API.post('/run_spider', { 
            code: sourceCode
        });
        return response.data;
    } catch (error) {
        console.error("Error executing code:", error);
        throw error;
    }
};