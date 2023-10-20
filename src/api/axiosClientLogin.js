import axios from 'axios';

// Set up default config for http requests here

const axiosClientLogin = axios.create({
  baseURL: 'https://c6a1-2001-ee0-5713-bd60-8065-aa48-7e49-c4eb.ngrok-free.app/api/v1',
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
