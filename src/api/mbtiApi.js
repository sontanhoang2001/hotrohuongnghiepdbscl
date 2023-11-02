import axiosService from './axiosClient';

const pathname = 'mbtis';

const mbtiApi = {
  getAllQuestion: (page, size) => {
    const url = `${pathname}?page=${page}&size=${size}`;
    return axiosService.get(url);
  },
  createQuestion: (payload) => {
    const url = `/${pathname}/add`;
    const rs = axiosService.post(url, payload);
    return rs;
  },
  newDoTestMbti: () => {
    const url = `/${pathname}/newDoTestMbti`;
    return axiosService.get(url);
  },
};

export default mbtiApi;
