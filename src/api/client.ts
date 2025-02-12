import axios from "axios";
import { API_CONFIG } from "./config";
import { ApiRoom } from "../screens/RoomList/types";

const apiClient = axios.create();
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    config.__retryCount = config.__retryCount || 0;
    if (
      config.__retryCount < 3 &&
      (!error.response || error.response.status >= 500)
    ) {
      config.__retryCount += 1;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return apiClient.request(config);
    }

    return Promise.reject(error);
  }
);
export const fetchRoomAvailability = async (): Promise<ApiRoom[]> => {
  try {
    const response = await apiClient.get<ApiRoom[]>(
      API_CONFIG.ROOM_AVAILABILITY_URL
    );

    if (!Array.isArray(response.data)) {
      throw new Error("Invalid API response format: expected an array");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching room availability:", error);
    throw error;
  }
};
