import axiosService from './axiosClient';

const pathname = 'organization';

const universityApi = {
  getAllUniversity: (page, size) => {
    const url = `${pathname}?page=${page}&size=${size}&organizationType=1`;
    return axiosService.get(url);
  },
};

export default universityApi;
