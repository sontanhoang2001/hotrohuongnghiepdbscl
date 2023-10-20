import axios from 'axios';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
//config for the full list of configs

const axiosClient = axios.create({
  baseURL: 'https://c6a1-2001-ee0-5713-bd60-8065-aa48-7e49-c4eb.ngrok-free.app/api/v1',
});

const accessToken = window.localStorage?.getItem('access_token');

axiosClient.interceptors.request.use(async (config) => {
  config.headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json',
  };
  return config;
});

axiosClient.interceptors.response.use(
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

// axiosClient.interceptors.response.use(
//   (response) => {
//     if (response && response.data) {
//       return response.data;
//     }
//     return response;
//   },
//   (error) => {
//     // Handle errors
//     throw error;
//   },
// );

export default axiosClient;
