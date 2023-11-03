import axiosService from './axiosClient';

const pathname = 'auth';

const authApi = {
  signin: (payload) => {
    const url = `/${pathname}/login`;
    return axiosService.post(url, payload);
  },
  signup: (payload) => {
    const url = `/${pathname}/registerUser`;
    return axiosService.post(url, payload);
  },
  requestOTP: (payload) => {
    const url = `/${pathname}/requestOTP`;
    return axiosService.post(url, payload);
  },
  authOTP: (payload) => {
    const url = `/${pathname}/authOTP`;
    return axiosService.post(url, payload);
  },
  authChangeEmail: (payload) => {
    const url = `/${pathname}/authChangeEmail`;
    return axiosService.post(url, payload);
  },
};

export default authApi;
