import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || "https://cinema-booking-system-ikd1o5k08-sihams-projects-fc2e78b5.vercel.app/api";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (conf) => {
    const token = localStorage.getItem('token');
    if (token) {
      conf.headers.Authorization = `Bearer ${token}`;
    }
    return conf;
  },
  (error) => Promise.reject(error)
);

export default api;