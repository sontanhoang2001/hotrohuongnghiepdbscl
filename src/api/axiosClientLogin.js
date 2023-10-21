import axios from 'axios';

// Set up default config for http requests here

const axiosClientLogin = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

axiosClientLogin.interceptors.request.use(async (config) => {
  config.headers = {
    Accept: 'application/json',
  };
  return config;
});

axiosClientLogin.interceptors.response.use(
  (response) => {
    if (response) {
      return response;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  },
);

export default axiosClientLogin;
