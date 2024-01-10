import axios from 'axios';

const URL = 'https://projectdev.alwaysdata.net/loufok';

const api = axios.create({
  baseURL: URL,
});

export const getCadavres = () => api.get('/api/cadavres');

export const getCadavreDetails = (id) => api.get(`/api/cadavre/${id}`);
