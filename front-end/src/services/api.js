import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const login = async (email, password) => {
  const result = await api.post('/login', { email, password });
  return result;
};

export {
  login,
};
