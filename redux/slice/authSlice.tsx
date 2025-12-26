import { AuthState, CommonParams } from "@/types/authSlice.type";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
// ❌ YEH NAHI: import axiosBaseURL from "../../axios";
// import { AuthState, CommonParams } from "@/types/authSlice.type";

const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: false,
  authenticate: false,
  access_token: "",
  refreshToken: "",
  userDetails: {
    name: "",
    userName: "",
    email: "",
    role: "",
    lastLogin: "",
    socialToken: "",
    isEmailVerified: false,
    isPremium: false,
    isDeleted: false,
    id: "",
  },
  common_params: {
    page: 1,
    limit: 10,
  },
};

interface LoginPayload {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginPayload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}auth/login`,
        data
      );

      if (response.status === 200) {
        toast.success(() => response?.data?.message, {
          duration: 1000,
        });
      }

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (data: { phone_number: string }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/otp/send`,
        data
      );
      if (response.status === 200) {
        toast.success(response.data.message || "OTP sent successfully");
        return response.data;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (
    data: { phone_number: string; otp: string; name?: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/otp/verify`,
        data
      );
      if (response.status === 200) {
        toast.success("Login successful");
        return response.data;
      }
    } catch (error: any) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Invalid OTP");
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ axiosBaseURL ki jagah normal axios + BASE_URL
export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (data: Record<string, any>, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}auth/refresh-tokens`,
        data
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Token refreshed successfully");
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Token refresh failed");
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  // ❗Yaha RootState import mat karo, simple inline type use karo
  const state = thunkAPI.getState() as { auth: AuthState };
  const refreshToken = state.auth.refreshToken;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`,
      { refreshToken }
    );

    if (response.status === 204) {
      toast.success("Logout successfully");
      return {};
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setCommonParam: (state, action: PayloadAction<CommonParams>) => {
      state.common_params = action.payload;
    },
    setIsloading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLogin: (state, action: PayloadAction<any>) => {
      state.authenticate = true;
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    setToken: (
      state,
      action: PayloadAction<{
        access: { token: string };
        refresh: { token: string };
      }>
    ) => {
      state.access_token = action.payload.access.token;
      state.refreshToken = action.payload.refresh.token;
    },
    setLogOut: (state) => {
      state.access_token = "";
      state.refreshToken = "";
      state.authenticate = false;
      state.isLoading = false;
      state.isLoggedIn = false;
      state.userDetails = {
        name: "",
        userName: "",
        email: "",
        role: "",
        lastLogin: "",
        socialToken: "",
        isEmailVerified: false,
        isPremium: false,
        isDeleted: false,
        id: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.access_token = action?.payload?.data?.tokens.access.token;
        state.refreshToken = action?.payload?.data?.tokens.refresh.token;
        state.authenticate = true;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userDetails = action?.payload?.data?.user;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        toast.error(() => action?.payload ?? action?.payload?.message, {
          duration: 1000,
        });
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<any>) => {
        state.access_token = action?.payload?.data?.tokens?.access?.token;
        state.refreshToken = action?.payload?.data?.tokens?.refresh?.token;
        state.authenticate = true;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userDetails = action?.payload?.data?.user;
      })
      .addCase(verifyOtp.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      })
      .addCase(
        refreshAccessToken.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.access_token = action.payload.access.token;
          state.refreshToken = action.payload.refresh.token;
        }
      )
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.access_token = "";
        state.refreshToken = "";
        state.authenticate = false;
        state.isLoading = false;
        state.isLoggedIn = false;
        state.userDetails = {
          name: "",
          userName: "",
          email: "",
          role: "",
          lastLogin: "",
          socialToken: "",
          isEmailVerified: false,
          isPremium: false,
          isDeleted: false,
          id: "",
        };
      })
      .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        toast.custom(() => action?.payload?.message, {
          duration: 1000,
        });
      });
  },
});

export const {
  setIsloading,
  setLogOut,
  setToken,
  setCommonParam,
  setIsLoggedIn,
  setLogin,
} = authSlice.actions;

export default authSlice.reducer;
