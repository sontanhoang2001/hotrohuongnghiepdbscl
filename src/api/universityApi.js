import axiosService from './axiosClient';
import qs from 'qs';

const pathname = 'organization';

const universityApi = {
  updateVerificationStatus: (data) => {
    const url = `${pathname}/updateStatusVerifyOrganization`;
    return axiosService.patch(url, data);
  },
  getVerificationRequests: (params) => {
    const url = `${pathname}?page=${params.page}&size=${params.size}&status=2&search=${params.search}`;
    return axiosService.get(url);
  },
  getAllUniversity: ({ page, size, search, organizationType }) => {
    const url = `${pathname}`;
    return axiosService.get(url, {
      params: { page, size, search, organizationType },
      paramsSerializer: qs.stringify,
    });
  },
  deleteUniversity: (id) => {
    const url = `${pathname}/delete/${id}`;
    return axiosService.delete(url);
  },
  restoreUniversity: (id) => {
    const url = `${pathname}/restore/${id}`;
    return axiosService.post(url);
  },
  getOrganizationById: (id) => {
    const url = `${pathname}/id/${id}`;
    return axiosService.get(url);
  },
  //admin
  updateOrganizationInfo: (data) => {
    const url = `${pathname}/edit/${data.id}`;
    return axiosService.patch(url, data);
  },
  //admin update verification
  updateVerificationByAdmin: (data) => {
    const url = `${pathname}/updateStatusVerifyOrganization`;
    return axiosService.patch(url, data);
  },
  //org
  updateOrganizationInfoByOrg: (data) => {
    const url = `${pathname}/edit/${data.id}`;
    return axiosService.patch(url, data);
  },
  requestVerification: (data) => {
    const url = `${pathname}/reqToVerifyOrganization`;
    return axiosService.patch(url, data);
  },
  getAllOrganizationsByUser: (params) => {
    const url = `${pathname}/getAllByUser`;
    return axiosService.get(url, { params: new URLSearchParams(Object.entries(params)) });
  },
  //client public api
  getAllPublicUniversityInfo: ({ page, size, search, organizationType, order }) => {
    const url = `public/organization`;
    return axiosService.get(url, {
      params: { page, size, search, organizationType, order },
    });
  },
  getAllSelectListUniversity: () => {
    const url = `public/organization/selectList?organizationType=1`;
    return axiosService.get(url);
  },

  getOneByOrganizationId: (id) => {
    const url = `${pathname}/getOneByOrganizationId/${id}`;
    return axiosService.get(url);
  },
  getAllOrganizationType: () => {
    const url = `${pathname}/getAllOrganizationType`;
    return axiosService.get(url);
  },
  createOrganization: (data) => {
    const url = `${pathname}/add`;
    return axiosService.post(url, data);
  },
};

export default universityApi;
