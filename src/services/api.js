import axios from 'axios';

// import { logout } from '../redux/auth/slice.js';

const BASE_URL = 'http://localhost:3000';
// const BASE_URL = 'https://vidreira-backend.onrender.com';

const axiosAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// axiosAPI.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response?.status === 401) {
//       store.dispatch(logout());
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosAPI;
