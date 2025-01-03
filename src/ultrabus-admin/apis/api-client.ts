import axios from 'axios';

const authorization = {};

if (typeof window !== 'undefined') {
    authorization['Authorization'] = 'Bearer ' + localStorage.getItem('token');
}

export const apiClient = axios.create({
    baseURL: 'http://localhost:5200/api',
    headers: {
        'Content-Type': 'application/json',
        ...authorization
    }
});
