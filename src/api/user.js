import axiosClientLogin from './axiosClient';

const userApi = {
  getUser: (payload) => {
    const url = `/users`;
    return axiosClientLogin.get(url, payload);
  },
};

export default userApi;
