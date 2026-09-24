import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("votesecure_user") || "null");

const initialState = {
  user: savedUser,
  isAuthenticated: Boolean(savedUser),
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("votesecure_user", JSON.stringify(action.payload));
    },
    register: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("votesecure_user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("votesecure_user");
    },
  },
});

export const { login, register, logout } = authSlice.actions;
export default authSlice.reducer;
