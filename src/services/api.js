import axios from 'axios';
// const BASE_URL = 'http://localhost:3000';
const BASE_URL = 'https://vidreira-register.onrender.com';

const axiosAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;

axiosAPI.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    // Не перехоплюємо refresh endpoint і повторні запити
    const isRefreshRequest = originalRequest.url.includes('/auth/refresh');
    const isLoginRequest = originalRequest.url.includes('/auth/login');

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshRequest &&
      !isLoginRequest
    ) {
      if (isRefreshing) {
        window.location.href = '/auth/login';
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosAPI.post('/auth/refresh');
        isRefreshing = false;
        return axiosAPI(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAPI;
