import axiosService from './axiosClient';

const pathname = 'mbtis';

const mbtiApi = {
  getQuestionGroups: () => {
    const url = `${pathname}/getAllQuestionGroup`;
    return axiosService.get(url);
  },
  getQuestionById: (id) => {
    const url = `${pathname}/id/${id}`;
    return axiosService.get(url);
  },
  getAllQuestion: (params) => {
    console.log('params',params)
    const url = `${pathname}?page=${params.page}&size=${params.size}&search=${params.search}`;
    return axiosService.get(url);
  },
  createQuestion: (payload) => {
    const url = `/${pathname}/add`;
    const rs = axiosService.post(url, {payload});
    return rs;
  },
  addNewMbti: (data) => {
    const url = `/${pathname}/add`;
    return axiosService.post(url,data);
  },
  updateMbti: (data) => {
    const url = `/${pathname}/edit/${data.id}`;
    return axiosService.patch(url,data);
  },
  deleteMbti: (id) => {
    const url = `/${pathname}/delete/${id}`;
    return axiosService.delete(url);
  },
  restoreMbti: (id) => {
    const url = `/${pathname}/restore/${id}`;
    return axiosService.post(url);
  },
};

export default mbtiApi;