import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.get('/auth/logout');
        window.location.href = '/login';
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
