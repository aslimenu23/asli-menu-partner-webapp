import { API_ENDPOINTS } from "./endpoints";
import axios from "axios";

export const getUser = async (firebaseUid: string) => {
  try {
    const data = await axios.get(`${API_ENDPOINTS.user}${firebaseUid}`);
    return { data: data.data };
  } catch (err) {
    // @ts-ignore
    if (err?.response?.status === 404) {
      return { error: { status: 404 } };
    }
    return { error: { status: 500 } };
  }
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

export const getAllRestaurants = async (user: any) => {
  try {
    const customHeaders = {
      user: user.id,
    };
    const data = await axios.get(API_ENDPOINTS.restaurant, {
      headers: customHeaders,
    });
    return data.data;
  } catch (err) {}
};

export const getRestaurantDetails = async (restaurantId: string, user: any) => {
  try {
    const customHeaders = {
      user: user.id,
    };
    const data = await axios.get(`${API_ENDPOINTS.restaurant}${restaurantId}`, {
      headers: customHeaders,
    });
    return data.data;
  } catch (err) {}
};

export const addRestaurant = async (payload: any) => {
  try {
    const customHeaders = {
      user: payload.user.id,
    };

    const data = await axios.post(`${API_ENDPOINTS.restaurant}`, payload, {
      headers: customHeaders,
    });
    return data.data;
  } catch (err) {}
};

export const deleteRestaurant = async (payload: any, resId: string) => {
  try {
    const customHeaders = {
      user: payload.user.id,
    };

    const data = await axios.delete(
      `${API_ENDPOINTS.restaurant}${resId}`,
      {
        headers: customHeaders,
      }
    );
    return data.data;
  } catch (err) {}
};

export const saveRestaurantDetails = async (payload: any, resId: string) => {
  try {
    const customHeaders = {
      user: payload.user.id,
    };

    const data = await axios.post(
      `${API_ENDPOINTS.restaurant}${resId}`,
      payload,
      {
        headers: customHeaders,
      }
    );
    return data.data;
  } catch (err) {}
};

export const saveMenuDetails = async (payload: any) => {
  try {
    const customHeaders = {
      user: payload.user.id,
    };

    const data = await axios.post(
      `${API_ENDPOINTS.restaurant}${payload.restaurantId}/menu`,
      payload,
      {
        headers: customHeaders,
      }
    );
    return data.data;
  } catch (err) {}
};