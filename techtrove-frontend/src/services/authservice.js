import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;