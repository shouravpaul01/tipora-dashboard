import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import { User } from "@/type";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: Cookies.get("accessToken") || null,
  refreshToken: Cookies.get("refreshToken") || null,
  user: null,
  isAuthenticated: !!Cookies.get("accessToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ==========================
    // Login
    // ==========================
    loginSuccess: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        user: User;
      }>
    ) => {
      const { accessToken, refreshToken, user } = action.payload;

      state.token = accessToken;
      state.refreshToken = refreshToken;
      state.user = user;
      state.isAuthenticated = true;

      Cookies.set("accessToken", accessToken);

      Cookies.set("refreshToken", refreshToken);
    },

    // ==========================
    // Update Access Token
    // ==========================
    updateAccessToken: (
      state,
      action: PayloadAction<{
        accessToken: string;
      }>
    ) => {
      state.token = action.payload.accessToken;
      state.isAuthenticated = true;

      Cookies.set("accessToken", action.payload.accessToken);
    },

    // ==========================
    // Update User
    // ==========================
    setUser: (
      state,
      action: PayloadAction<User>
    ) => {
      state.user = action.payload;
    },

    // ==========================
    // Logout
    // ==========================
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;

      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    },
  },
});

export const {
  loginSuccess,
  updateAccessToken,
  setUser,
  logout,
} = authSlice.actions;

export default authSlice.reducer;