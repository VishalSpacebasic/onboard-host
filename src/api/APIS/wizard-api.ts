import axiosInstance from "../axios.instance";

const collegeId = sessionStorage.getItem("collegeId");
const v3Url = `/api/v3/onboarding/forms/133`;

export const setPersonalInfo = (data: any) => {
  return axiosInstance.post(`${v3Url}/personalDetails`, { ...data });
};

export const getPersonalInfo = () => {
  return axiosInstance.get(`${v3Url}/personalDetails`);
};

export const getAcademicDropDown = () => {
  return axiosInstance.get(`${v3Url}/academicDropDown`);
};

export const getStudentInfo = () => {
  return axiosInstance.get(`${v3Url}/studentInfo`);
};

export const setAcademicInfo = (data: {
  courseId: number;
  streamId: number;
  batch: number;
}) => {
  return axiosInstance.post(`${v3Url}/academicInfo`, data);
};

export const GetCurrentStep = async () => {
  const result = await axiosInstance.get(`${v3Url}/currentStep`);
  return result.data;
};
export const uploadKYcInfo = async (file: FormData) => {
  const result = await axiosInstance.post(`${v3Url}/KYCVerification`, file);
};

export const getKycLink = async () => {
  const result = await axiosInstance.get(`${v3Url}/KYCVerification`);
  return result.data;
};

export const getAccademicInfo = async () => {
  const result = await axiosInstance.get(`${v3Url}/academicInfo`);
  return result.data;
};

export const setParentInfo = async (data: any) => {
  const result = await axiosInstance.post(`${v3Url}/parentInfo`, data);
  return result.data;
};
export const getParentInfo = async () => {
  const result = await axiosInstance.get(`${v3Url}/parentInfo`);
  return result.data;
};
export const GetCurrentStatus = async () => {
  const result = await axiosInstance.get(`${v3Url}/status`);
  return result.data;
};

export const getRoomAllocationStatus = async () => {
  const result = await axiosInstance.get(`${v3Url}/roomStatus`);
  return result.data;
};

export const getFileUplaodTemplate = async () => {
  const result = await axiosInstance.get(`${v3Url}/template`);
  return result.data;
};
export const uplaodFileForVerification = async (data: FormData) => {
  const result = await axiosInstance.post(
    `${v3Url}/documentVerification`,
    data
  );
  return result.data;
};
export const getPaymentMethods = async () => {
  const result = await axiosInstance.get(`${v3Url}/paymentMethods`);
  return result.data;
};
export const getBankDetails = async () => {
  const result = await axiosInstance.get(`${v3Url}/bank-details`);
  return result.data;
};
export const setBankDetails = async (data) => {
  const result = await axiosInstance.post(`${v3Url}/bank-details`, data);
  return result.data;
};

export const getServices=async ()=>{
  const result = await axiosInstance.get(`${v3Url}/getServices`);
  return result.data;
}
export const getProfilePicture=async ()=>{
  const result = await axiosInstance.get(`${v3Url}/profilePicture`);
  return result.data;
}
export const setProfileImage=async (data)=>{
  const result = await axiosInstance.post(`${v3Url}/profilePicture`,data);
  return result.data;
}
export const roomSelectionMuj=async (data)=>{
  const result = await axiosInstance.post(`${v3Url}/mujonboard`,data);
  return result.data;
}
