import axiosClient from './axiosClient';

const pathname = 'auth';

const authApi = {
  signin: (payload) => {
    const url = `/${pathname}/login`;
    return axiosClient.post(url, payload);
  },
  signup: (payload) => {
    const url = `/${pathname}/registerUser`;
    return axiosClient.post(url, payload);
  },
  requestOTP: (payload) => {
    const url = `/${pathname}/requestOTP`;
    return axiosClient.post(url, payload);
  },
  authOTP: (payload) => {
    const url = `/${pathname}/authOTP`;
    return axiosClient.post(url, payload);
  },
  authChangeEmail: (payload) => {
    const url = `/${pathname}/authChangeEmail`;
    return axiosClient.post(url, payload);
  },
  changePassword: (payload) => {
    const url = `/${pathname}/changePassword`;
    return axiosClient.post(url, payload);
  },
};

export default authApi;
