import { API_ENDPOINTS } from "./endpoints";
import axios from "axios";

export const verifyUser = async ({ uid }: { uid: string }) => {
  try {
    const data = await axios.get(`${API_ENDPOINTS.user}${uid}`);
    console.log("user_data_12345", data);
    return data.data;
  } catch (err) {}
};

export const createUser = async ({
  userObject,
}: {
  userObject: {
    uid: string;
    name: string;
    phoneNumber: string;
  };
}) => {
  try {
    console.log("Request_12345", userObject);
    const data = await axios.post(`${API_ENDPOINTS.user}`, userObject);
    return data.data;
  } catch (err) {}
};
