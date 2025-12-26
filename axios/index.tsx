import { RootState } from "@/redux/store";
import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { setLogOut, setToken } from "../redux/slice/authSlice";
// import type { RootState } from "../redux/store";
import { store as reduxStorage } from "../redux/store";
// import CustomToast from "../components/CustomToast/CustomToast";
import { toast } from "sonner";

const axiosBaseURL: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
// Define a function to bypass the interceptor for specific requests
function bypassInterceptorForRefreshRequest(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  // Check if this is a "refresh" API request (you can adjust the condition as needed)
  if (config.url === "/auth/refresh-tokens" && config.method === "post") {
    console.log("config.url= ", config.url, config.method);

    // Remove the response interceptor temporarily
    axiosBaseURL.interceptors.request.eject(axiosInterceptorRequest);
  }
  return config;
}

// Define the request interceptor
const axiosInterceptorRequest = axiosBaseURL.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = (reduxStorage.getState() as RootState).auth
      .access_token;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log("config.headers", axiosBaseURL.interceptors, axios);
    return bypassInterceptorForRefreshRequest(config);
  },
  (error) => Promise.reject(error)
);

export const logOutRequest = async (refreshToken: string) => {
  try {
    const response = await axiosBaseURL.post("/auth/logout", {
      refreshToken,
    });
    console.log("response2", response?.data?.code);
    if (response?.data?.code === 204 || response?.data?.code === 200) {
      console.log("response2-inner", response?.data?.code);
      reduxStorage.dispatch(setLogOut());
    }
    console.log("response3", response);
    return response;
  } catch (error: any) {
    reduxStorage.dispatch(setLogOut());
    console.log("logoutError", error?.response);
    return error;
  }
};

export const refreshTokenRequest = async (refreshToken: string) => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await axios.post(`${baseURL}/auth/refresh-tokens`, {
      refreshToken,
    });

    console.log("response2", response);
    return response;
  } catch (error: any) {
    console.error("Token refresh failed:", error?.response?.data?.code === 401);
    if (error?.response?.data?.code === 401) {
      await logOutRequest(refreshToken);
    }
    console.error("Token refresh failed:", error);
    // reduxStorage.dispatch(setLogOut());
    return error;
  }
};

axiosBaseURL.interceptors.response.use(
  async (response: AxiosResponse) => {
    console.log("response==1", response);
    if (response?.status === 200) {
    }
    return response;
  },
  async (error: any) => {
    console.log("error==2", error);
    if (
      error.response?.data?.code === 400 ||
      error.response?.data?.code === 404 ||
      error.response?.data?.code === 409 ||
      error.response?.data?.code === 500
    ) {
      console.log("error==", error.response?.data?.message);
      toast.error(() => error.response?.data?.message, {
        duration: 1000, // 2-second duration
      });
    }
    if (error.response?.data?.code !== 401) {
      return;
    }

    const refreshToken =
      (reduxStorage?.getState() as RootState).auth?.refreshToken ?? "";
    if (error.response && error.response.status === 401) {
      try {
        const res = await refreshTokenRequest(`${refreshToken}`);
        console.log("errorNew--*", res);
        console.log("resRefresh===", res?.data?.refresh?.token);
        if (res?.data) {
          reduxStorage.dispatch(setToken(res?.data));
          return await axiosBaseURL.request(error.config); // Retry the original request
        }
      } catch (refreshError) {
        console.log("refreshError==", refreshError);
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosBaseURL;
