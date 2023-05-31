import axiosInstance from "../axios.instance";

const collegeId = sessionStorage.getItem("collegeId");
const v3Url = `/api/v3/onboarding/init/${collegeId}`;

export const sendOtp = (data: any) =>
  axiosInstance.post(`${v3Url}/sendOtp`, { ...data });

export const verifyOtp = (data: any) =>
  axiosInstance.post(`${v3Url}/verifyOtp`, data);
