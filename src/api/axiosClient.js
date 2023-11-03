import axios from 'axios';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
//config for the full list of configs

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const accessToken = window.localStorage?.getItem('accessToken');
console.log(accessToken);

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
