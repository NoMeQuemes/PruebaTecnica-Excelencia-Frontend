// src/axios.js
import axios from 'axios';
import router from './router';

const apiClient = axios.create({
  baseURL: 'https://localhost:7068/api/',
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post('https://localhost:7068/api/Acceso/RefreshToken', { token: refreshToken });
        const newToken = response.data.token;
        localStorage.setItem('token', newToken);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        router.push({ name: 'login' });
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
