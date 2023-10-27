import { API_ENDPOINTS } from "./endpoints";
import axios from "axios";

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

export const restaurantDetails = async (payload: any) => {
  try {
    console.log("payload_12345", payload);
    const data = await axios.post(API_ENDPOINTS.restaurant, payload);
    return data.data;
  } catch (err) {}
};