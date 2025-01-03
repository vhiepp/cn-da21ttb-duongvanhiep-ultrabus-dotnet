import { apiClient } from '@/apis/api-client';

export function getToken() {
    return localStorage.getItem('token') || '';
}

export function setToken(token: string) {
    localStorage.setItem('token', token);
}

export const fetcher = (url: string) => apiClient.get(url).then((res) => res.data.data);
