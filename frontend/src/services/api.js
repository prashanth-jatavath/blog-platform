import axios from 'axios';

const API = axios.create({
  baseURL: 'https://blog-platform-backend-9lg5.onrender.com/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');

  if (token) {
    req.headers.Authorization = token;
  }

  return req;
});

export default API;