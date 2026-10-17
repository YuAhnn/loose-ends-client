import api from '../client';

async function login({ username, password } = {}) {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
}

async function register({ username, password } = {}) {
  const response = await api.post('/auth/register', { username, password });
  return response.data;
}

async function me() {
  const response = await api.get('/me');
  return response.data;
}

async function logout({ token } = {}) {
  const response = await api.post('/auth/logout', { token });
  return response.data;
}

export {
  login,
  logout,
  register,
  me
}