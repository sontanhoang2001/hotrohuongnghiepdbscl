import axiosService from './axiosClient';

const pathname = 'mbtis';
const publicPathname = 'public/mbti';

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
    console.log('params', params);
    const url = `${pathname}?page=${params.page}&size=${params.size}&search=${params.search}`;
    return axiosService.get(url);
  },

  createQuestion: (payload) => {
    const url = `/${pathname}/add`;
    const rs = axiosService.post(url, payload); //truyền thẳng đối tượng thì gỡ {}
    return rs;
  },
  addNewMbti: (data) => {
    const url = `/${pathname}/add`;
    return axiosService.post(url, data);
  },
  updateMbti: (data) => {
    const url = `/${pathname}/edit/${data.id}`;
    return axiosService.patch(url, data);
  },
  deleteMbti: (id) => {
    const url = `/${pathname}/delete/${id}`;
    return axiosService.delete(url);
  },
  restoreMbti: (id) => {
    const url = `/${pathname}/restore/${id}`;
    return axiosService.post(url);
  },
  //public data
  getQuestionTodotestMbti: () => {
    const url = `/${publicPathname}/get-question-todotestMbti`;
    return axiosService.get(url);
  },

  getGetAllpersonality: () => {
    const url = `/${publicPathname}/personality-groups`;
    return axiosService.get(url);
  },
  storeTestHistory: (id) => {
    const url = `/${pathname}/storeTestHistory?mbtiId=${id}`;
    return axiosService.post(url);
  },
  getTestHistoryById: (id) => {
    const url = `/${pathname}/getTestHistoryById/${id}`;
    return axiosService.get(url);
  },
  getAllTestHistory: ({ page, size }) => {
    const url = `/${pathname}/getAllTestHistory`;
    return axiosService.get(url, {
      params: { page, size },
      // paramsSerializer: qs.stringify,
    });
  },
  getMajorMBTIById: (id) => {
    const url = `/${publicPathname}/getMajorMBTIById/${id}`;
    return axiosService.get(url);
  },
};

export default mbtiApi;