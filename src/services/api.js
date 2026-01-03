import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
// const BASE_URL = 'https://vidreira-backend.onrender.com';

const axiosAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosAPI;
