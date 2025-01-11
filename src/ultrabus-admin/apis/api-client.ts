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
    },
    validateStatus: function (status) {
        if (status === 403) {
            window.location.href = '/';
        } else if (status === 401) {
            window.location.href = '/auth/login';
        }
        return status < 500; // Resolve only if the status code is less than 500
    }
});
