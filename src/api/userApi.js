import axiosService from './axiosClient';

const pathname = 'users';
const userApi = {
  getAllUser: (page, size) => {
    const url = `${pathname}?page=${page}&size=${size}`;
    return axiosService.get(url);
  },
  deleteUser: (id) => {
    const url = `${pathname}/delete/${id}`;
    return axiosService.delete(url);
  },
  restoreUser: (id) => {
    const url = `${pathname}/restore/${id}`;
    return axiosService.post(url);
  },
  updateUser: (payload) => {
    const url = `${pathname}/edit`;
    return axiosService.patch(url, payload);
  },
  getUserProfile: () => {
    const url = `${pathname}/profile`;
    return axiosService.get(url);
  },
};

export default userApi;
