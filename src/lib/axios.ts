import axios from 'axios'
import { API_URL } from "../config/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const is401 = error.response?.status === 401;
    const isAuthMeEndpoint = error.config?.url?.includes('/auth/me');

    if (is401 && !isAuthMeEndpoint) {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);
