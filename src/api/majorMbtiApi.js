import axiosService from './axiosClient';

const pathname = 'majorMbti';

const majorMbtiApi = {
  getAllMajorMbti: ({ page, size, organizationId, mbtiId, search }) => {
    // console.debug('search', search);
    const url = `${pathname}`;
    return axiosService.get(url, {
      params: { page, size, organizationId, mbtiId, search },
    });
  },
  //create new
  createMajorMbti: (payload) => {
    const url = `/${pathname}/add`;
    return axiosService.post(url, payload);
  },
  // delete
  deleteMajorMbti: (id) => {
    const url = `/${pathname}/delete/${id}`;
    return axiosService.post(url);
  },
  //restore
  restoreMajorMbti: (id) => {
    const url = `/${pathname}/restore/${id}`;
    return axiosService.post(url);
  },
  //update
  // updateMajorMbti: (data) => {
  //   const url = `/${pathname}/edit/${data.id}`;
  //   return axiosService.patch(url);
  // },
  updateMajorMbti: (data) => {
    const url = `/${pathname}/edit/${data.id}`;
    return axiosService.patch(url, data);
  },
  //get by id
  getMajorMbtiById: (id) => {
    const url = `/${pathname}/id/${id}`;
    return axiosService.get(url);
  },
};

export default majorMbtiApi;
