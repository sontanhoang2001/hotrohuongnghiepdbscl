import axiosService from './axiosClient';

const pathname = 'university';

const universityApi = {
  getAllUniversity: (page, size) => {
    const url = `${pathname}?page=${page}&size=${size}`;
    return axiosService.get(url);
  },

};

export default universityApi;
