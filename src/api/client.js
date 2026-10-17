import axios from 'axios';

export const TOKEN_KEY = 'index.token';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 60000, // Render free tier can take ~30-60s to wake from sleep
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function errorMessage(err) {
  return err.response?.data?.error || err.message || 'Something went wrong';
}

export default api;