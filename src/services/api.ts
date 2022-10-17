import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

const api = applyCaseMiddleware(axios.create({
  baseURL: import.meta.env.VITE_API_URL
}));

export const attachAuthorizationHeader = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default api;