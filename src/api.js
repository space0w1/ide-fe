import axios from 'axios';

const API = axios.create({
    baseURL: 'http://192.168.2.6:8000/'
});

export const executeCode = async (sourceCode, language) => {
    try {
        const response = await API.post('/execute', { 
            command: sourceCode
        });
        return response.data;
    } catch (error) {
        console.error("Error executing code:", error);
        throw error;
    }
};