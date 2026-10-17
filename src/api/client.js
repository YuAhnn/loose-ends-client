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
  const data = err.response?.data;
  const detail = typeof data === 'string' ? data : data?.error ?? data?.message;

  if (typeof detail === 'string' && detail) return detail;
  if (typeof detail?.message === 'string' && detail.message) return detail.message;

  return err.message || 'Something went wrong';
}

export default api;