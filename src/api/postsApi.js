import axiosService from './axiosClient';

const pathname = 'postsOrganization';

const faqsApi = {
  getAll: (params) => {
    const url = `${pathname}?page=${params.page}&size=${params.size}`;
    return axiosService.get(url);
  },
  getById: (params) => {
    const url = `${pathname}/id/${params.id}?organizationId=${params.organizationId}`;
    return axiosService.get(url);
  },
  create: (data) => {
    const url = `${pathname}/add`;
    return axiosService.post(url, data);
  },
  update: (data) => {
    const url = `${pathname}/edit/${data.id}`;
    return axiosService.patch(url, data);
  },
  delete: (params) => {
    const url = `${pathname}/delete/${params.id}?organizationId=${params.organizationId}`;
    return axiosService.delete(url);
  },
  restore: (params) => {
    const url = `${pathname}/restore/${params.id}?organizationId=${params.organizationId}`;
    return axiosService.post(url);
  },
  //pulic api
  getAllPublicPosts: (params) => {
    const url = `public/posts?page=${params.page}&size=${params.size}`;
    return axiosService.get(url);
  },
};

export default faqsApi;
