import axiosInstance from "../axios.instance";

const collegeId = sessionStorage.getItem("collegeId");
const v3Url = `/api/v3/onboarding/v2/payment/${collegeId}`;

export const selectRoomAfterpayment = async (roomId) => {
  const result = await axiosInstance.post(
    `${v3Url}/room-selection/student?roomId=${roomId}`
  );
  return result.data;
};

export const getRoomSaleItem = async (roomTypeId) => {
  const result = await axiosInstance.get(`${v3Url}/get-room-fee/${roomTypeId}`);
  return result.data;
};
export const getServiceSaleItems = async () => {
  const result = await axiosInstance.get(`${v3Url}/get-services`);
  return result.data;
};

export const setServicesSaleItems = async (payload) => {
  const result = await axiosInstance.post(`${v3Url}/select-services`, payload);
  return result.data;
};

export const getTotalSaleItemsBreakdown = async (payload) => {
  const result = await axiosInstance.get(`${v3Url}/get-sale-item-breakup`);
  return result.data;
};
