import axios from 'axios';
// const BASE_URL = 'http://localhost:3000';
const BASE_URL = 'https://vidreira-register.onrender.com';

const axiosAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let isRefreshing = false; // захист від багаторазових refresh запитів

axiosAPI.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    // Якщо 401 і ще не пробували refresh для цього запиту
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Якщо вже йде refresh — одразу на логін (щоб не зациклитись)
      if (isRefreshing) {
        window.location.href = '/login';
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Спробуй оновити токен
        await axiosAPI.post('/auth/refresh');
        isRefreshing = false;

        // Повтори оригінальний запит
        return axiosAPI(originalRequest);
      } catch (refreshError) {
        // Refresh теж не вдався — тепер на логін
        isRefreshing = false;
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAPI;
