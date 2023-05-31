import axiosInstance from "../axios.instance";

const collegeId = sessionStorage.getItem("collegeId");
const v3Url = `/api/v3/onboarding/payments`;

export const getPaymentInfo = async () => {
  const url = `${v3Url}/details`;
  const { data } = await axiosInstance.get(url);
  return data;
};

export const getRazorPayOrder = async () => {
  const url = `${v3Url}/razorpay/order`;
  const { data } = await axiosInstance.post(url);
  return data;
};
export const payOffline = async (payload: FormData) => {
  const url = `${v3Url}/offline/transaction`;
  const { data } = await axiosInstance.post(url, payload);
  return data;
};
export const getPastTransactions = async () => {
  const { data } = await axiosInstance.get(`${v3Url}/transactions`);
  return data;
};
