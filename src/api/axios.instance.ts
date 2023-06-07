import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// const API_BASE_URL = "http://localhost:8080/";
const API_BASE_URL="https://api.spacebasic.com/"

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  },
});
const setAuthorizationHeader = (accessToken: any) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};
export const updateAccessToken = (accessToken: any) => {
  setAuthorizationHeader(accessToken);
};
axiosInstance.interceptors.request.use(
  (config: any) => {
    const accessToken = sessionStorage.getItem("accessToken");
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
// axiosInstance.defaults.headers.common["Authorization"] =
//   "Bearer " + localStorage.getItem("accessToken");

export default axiosInstance;
