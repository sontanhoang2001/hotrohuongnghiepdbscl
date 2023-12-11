import axiosClient from './axiosClient';

const BASE_URL = `${process.env.REACT_APP_API_URL}`;
const pathname = 'dashboard';

const dashboardApi = {
  getAll: async (payload) => {
    const url = `${BASE_URL}/api/${pathname}/countAll`;
    const rs = await axiosClient.get(url, payload);
    return rs;
  },
};

export default dashboardApi;
