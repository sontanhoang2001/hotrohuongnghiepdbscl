import axiosService from './axiosClient';

const pathname = 'chat';

const chatApi = {  
  getAllChatsOrgId: (orgId) => {
    const url = `${pathname}/getAllChats/${orgId}`;
    return axiosService.get(url);
  },
  getChatMessagesById: ({chatId,beforeId}) => {
    const url = `${pathname}/getChatMessagesById?chatId=${chatId}&beforeId=${beforeId}&size=20`;
    return axiosService.get(url);
  },
  getCustomerChatMessages: ({organizationId,beforeId}) => {
    const url = `${pathname}/getChatMessagesCustomer?organizationId=${organizationId}&beforeId=${beforeId}&size=3`;
    return axiosService.get(url);
  },
  sendmessage: (data) => {
    const url = `${pathname}/add`;
    return axiosService.post(url,data);
  },

};

export default chatApi;
