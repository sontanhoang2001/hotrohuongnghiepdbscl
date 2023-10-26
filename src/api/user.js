import axiosClientLogin from './axiosClient';

const userApi = {
  getAllUser: (payload) => {
    const url = `/users`;
    return axiosClientLogin.get(url, payload);
  },
};

export default userApi;
