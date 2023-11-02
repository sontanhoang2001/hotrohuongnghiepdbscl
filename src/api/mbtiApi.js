import axiosService from './axiosClient';

const pathname = 'mbtis';

const mbtiApi = {
  getAllQuestion: (page, size) => {
    const url = `${pathname}?page=${page}&size=${size}`;
    return axiosService.get(url);
  },
};

export default mbtiApi;
