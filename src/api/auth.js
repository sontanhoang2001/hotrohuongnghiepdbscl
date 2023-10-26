import axiosClientLogin from './axiosClient';

const pathname = 'auth';

const authApi = {
  signin: (payload) => {
    const url = `/${pathname}/login`;
    return axiosClientLogin.post(url, payload);
  },
  signup: (payload) => {
    const url = `/${pathname}/registerUser`;
    return axiosClientLogin.post(url, payload);
  },
};

export default authApi;
