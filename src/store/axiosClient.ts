import axios from 'axios';

export const axiosClient = axios.create({
  baseURL:
    "https://a26930-7253.x.d-f.pw" /*import.meta.env.VITE_APP_BACKEND_URI*/,
});
