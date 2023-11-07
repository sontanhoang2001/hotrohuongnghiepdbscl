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
  addNewMbti: () => {
    const url = `/${pathname}/add`;
    return axiosService.post(url);
  },
  deleteMbti: (id) => {
    const url = `/${pathname}/newDoTestMbti/${id}`;
    return axiosService.delete(url);
  },
};

export default mbtiApi;
