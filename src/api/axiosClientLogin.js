import axios from 'axios';

// Set up default config for http requests here

const axiosService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosService.interceptors.request.use(async (config) => {
  config.headers = {
    Accept: 'application/json',
  };
  return config;
});

axiosService.interceptors.response.use(
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

export default axiosService;
