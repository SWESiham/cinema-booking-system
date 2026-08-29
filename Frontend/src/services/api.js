import axios from 'axios';

const BASE_URL = "http://localhost:4000/api"

const api = axios.create({
    baseURL:BASE_URL,
})

api.interceptors.request.use(
    (conf) => {
        const token = localStorage.getItem('token')
        if (token) {
            conf.headers.Authorization = `Bearer ${token}`
        }
        return conf;
    }, (error) => Promise.reject(error)
);

export default api;