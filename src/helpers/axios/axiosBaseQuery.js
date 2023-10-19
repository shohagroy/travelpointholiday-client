import { setRefreshToken } from "@/utils/cooki-storate";
import { instance } from "./axiosInstance";

const axiosBaseQuery = ({ baseUrl = "" } = { baseUrl: "" }) => {
  return async ({ url, method, data, params, contentType }) => {
    try {
      const result = await instance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          contentType: contentType || "application/json",
        },
        withCredentials: true,
      });

      if (result?.data?.refreshToken) {
        setRefreshToken(result?.data?.refreshToken);
      }

      return { data: result };
    } catch (axiosError) {
      console.log(axiosError);
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
};

module.exports = { axiosBaseQuery };
