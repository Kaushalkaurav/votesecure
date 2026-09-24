import { createSlice } from "@reduxjs/toolkit";
import { elections } from "../../data/mockData";

const electionSlice = createSlice({
  name: "elections",
  initialState: {
    items: elections,
    loading: false,
    error: null,
  },
  reducers: {
    addElection: (state, action) => {
      state.items.unshift(action.payload);
    },
    updateElection: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteElection: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addElection, updateElection, deleteElection } = electionSlice.actions;
export default electionSlice.reducer;
