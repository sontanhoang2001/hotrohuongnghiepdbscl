import axiosService from './axiosClient';

const pathname = 'organization';

const universityApi = {
  updateVerificationStatus: (data) => {
    const url = `${pathname}/updateStatusVerifyOrganization`;
    return axiosService.patch(url,data);
  },
  getVerificationRequests: (params) => {
    const url = `${pathname}?page=${params.page}&size=${params.size}&status=2`;
    return axiosService.get(url);
  },
  getAllUniversity: (page, size) => {
    const url = `${pathname}?page=${page}&size=${size}&organizationType=1`;
    return axiosService.get(url);
  },
  deleteUniversity: (id) => {
    const url = `${pathname}/delete/${id}`;
    return axiosService.delete(url);
  },
  getOrganizationById: (id) => {
    const url = `${pathname}/id/${id}`;
    return axiosService.get(url);
  },
  updateOrganizationInfo: (data) => {
    const url = `${pathname}/edit/${data.id}`;
    return axiosService.patch(url,data);
  },
  requestVerification: (data) => {
    const url = `${pathname}/reqToVerifyOrganization`;
    return axiosService.patch(url,data);
  },
  getAllOrganizationsByUser: () => {
    const url = `${pathname}/getAllByUser?page=1&size=100`;
    return axiosService.get(url);
  },
};

export default universityApi;
