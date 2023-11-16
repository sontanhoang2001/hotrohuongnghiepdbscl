import axiosService from './axiosClient';

const pathname = 'users';
const userApi = {
  getAllUser: (page, size) => {
    const url = `${pathname}?page=${page}&size=${size}`;
    return axiosService.get(url);
  },
};

export default userApi;
