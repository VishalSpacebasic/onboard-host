import axiosInstance from "../axios.instance";

const collegeId = sessionStorage.getItem("collegeId");
const v3Url = `/api/v3/onboarding/rooms`;

export const getAvailableRooms = async () => {
  const result = await axiosInstance.get(`${v3Url}/available`);
  return result.data;
};
export const submitRoomSelection = async (data: {
  room?: any;
  roomPreference1?: any;
  roomPreference2?: any;
  roomPreference3?: any;
}) => {
  const result = await axiosInstance.post(`${v3Url}/preferences`, data);
  return result.data;
};
export const getRoomDataAfterPaymentForSelection = async () => {
  const result = await axiosInstance.get(`${v3Url}/preferences`);
  return result.data;
};
export const selectRoomAfterpayment = async (roomId) => {
  const result = await axiosInstance.post(
    `${v3Url}/room-selection/student?roomId=${roomId}`
  );
  return result.data;
};

// export const
