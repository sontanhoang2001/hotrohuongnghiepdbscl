import axiosService from './axiosClient';

const userApi = {
  getAllUser: (payload) => {
    const url = `/users`;
    return axiosService.get(url, payload);
  },
};

export default userApi;
