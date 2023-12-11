import axiosClient from './axiosClient';

const BASE_URL = `${process.env.REACT_APP_API_URL}`;
const pathname = 'dashboard';

const dashboardApi = {
  getAll: async () => {
    const url = `${BASE_URL}/${pathname}/countAll`;
    const rs = await axiosClient.get(url);
    return rs;
  },
};

export default dashboardApi;
