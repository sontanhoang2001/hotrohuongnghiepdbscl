import axiosService from './axiosClient';

const pathname = 'chat';

const faqsApi = {  
  getAllChatsOrgId: (orgId) => {
    const url = `${pathname}/getAllChats/${orgId}`;
    return axiosService.get(url);
  },
  getChatMessagesById: (chatId,beforeId) => {
    const url = `${pathname}/`;
    return axiosService.get(url);
  },
  create: (data) => {
    const url = `${pathname}/add`;
    return axiosService.post(url,data);
  },
  update: (data) => {
    const url = `${pathname}/edit/${data.id}`;
    return axiosService.patch(url,data);
  },
  delete: (params) => {
    const url = `${pathname}/delete/${params.id}?organizationId=${params.organizationId}`;
    return axiosService.delete(url);
  },
  restore: (params) => {
    const url = `${pathname}/restore/${params.id}?organizationId=${params.organizationId}`;
    return axiosService.post(url);
  },
};

export default faqsApi;
