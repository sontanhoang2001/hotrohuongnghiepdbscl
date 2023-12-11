import axiosClient from "./axiosClient";

const BASE_URL = `${process.env.REACT_APP_API_URL}`;
const dashboardApi = {
  getAll: async (payload) => {
    const url = `${BASE_URL}/api/findaccountbyusername`;
   const rs=await axiosClient.post(url, payload);
   return rs;
  },
};

export default dashboardApi;
