import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5500/api', // Aggiunto /api
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors per gestire errori globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
