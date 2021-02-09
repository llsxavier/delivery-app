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

const register = async (name, lastname, email, password, role) => {
  try {
    const result = await api.post('/register', {
      name,
      lastname,
      email,
      password,
      role,
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

const getNewPass = async (email) => {
  try {
    const result = await api.post('/getNewPassword', {
      email,
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

export { login, register, getNewPass };
