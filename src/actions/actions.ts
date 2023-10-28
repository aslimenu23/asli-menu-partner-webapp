import { API_ENDPOINTS } from "./endpoints";
import axios from "axios";

export const getUser = async (firebaseUid: string) => {
  try {
    const data = await axios.get(`${API_ENDPOINTS.user}${firebaseUid}`);
    return data.data;
  } catch (err) {}
};

export const verifyUser = async ({ phoneNumber }: { phoneNumber: string }) => {
  try {
    const data = await axios.post(API_ENDPOINTS.isNewUser, {
      phoneNumber,
    });
    return data.data;
  } catch (err) {}
};

export const createUser = async (userObject: {
  uid: string;
  name: string;
  phoneNumber: string;
}) => {
  try {
    const data = await axios.post(API_ENDPOINTS.user, userObject);
    return data.data;
  } catch (err) {}
};

// Action to add/edit restaurant details
export const restaurantDetails = async (payload: any) => {
  try {
    const data = await axios.post(API_ENDPOINTS.restaurant, payload);
    return data.data;
  } catch (err) {}
};