import api from './api';

export const register = async (userData) => {
  const res = await api.post('/auth/register', userData);
  return res.data;
};

export const login = async (userData) => {
  const res = await api.post('/auth/login', userData);
  return res.data;
};

export const logout = async () => {
  const res = await api.get('/auth/logout');
  return res.data;
};

export const getMe = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};
