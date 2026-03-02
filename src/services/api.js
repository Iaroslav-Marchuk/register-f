import axios from 'axios';
// const BASE_URL = 'http://localhost:3000';
const BASE_URL = 'https://vidreira-register.onrender.com';

const axiosAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// axiosAPI.interceptors.response.use(
//   res => res,
//   async error => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes('/auth/refresh')
//     ) {
//       originalRequest._retry = true;

//       try {
//         await axiosAPI.post('/auth/refresh');
//         return axiosAPI(originalRequest);
//       } catch (err) {
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

axiosAPI.interceptors.response.use(
  res => res,
  async error => {
    if (error.response?.status === 401) {
      // токен відсутній або refresh не пройшов
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosAPI;
