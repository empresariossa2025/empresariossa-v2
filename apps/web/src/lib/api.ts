import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5500/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors semplificati per debug
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
