import axiosClientLogin from './axiosClient';

const pathname = 'auth';

const authApi = {
  login: (payload) => {
    const url = `/${pathname}/login`;
    return axiosClientLogin.post(url, payload);
  },
};

export default authApi;
