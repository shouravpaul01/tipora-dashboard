import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { User } from "@/type";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        accessToken: string;
        user: User;
      }>,
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    updateAccessToken: (
      state,
      action: PayloadAction<{
        accessToken: string;
      }>,
    ) => {
      state.token = action.payload.accessToken;
      state.isAuthenticated = true;
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    },
  },
});

export const { loginSuccess, updateAccessToken, setUser, logout } =
  authSlice.actions;

export default authSlice.reducer;
