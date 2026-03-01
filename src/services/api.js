import axios from 'axios';
// const BASE_URL = 'http://localhost:3000';
const BASE_URL = 'https://vidreira-register.onrender.com/';

const axiosAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosAPI.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axiosAPI.post('/auth/refresh');

        return axiosAPI(originalRequest);
      } catch (refreshError) {
        console.log('Refresh token expired or invalid', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAPI;
