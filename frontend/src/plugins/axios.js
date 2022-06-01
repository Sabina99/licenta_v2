import axios from 'axios';
import { API_BASE_URL } from '../env'
// import { Routes } from "../routes";

let instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {

  if (error?.response?.status === 401) {
    window.navigate('/login');
  }
  return Promise.reject(error);
});


export default instance;
