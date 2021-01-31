import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const login = async (email, password) => {
  try {
    const result = await api.post('/login', { email, password });
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

export { login };
