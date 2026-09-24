import { createSlice } from "@reduxjs/toolkit";
import { candidates } from "../../data/mockData";

const candidateSlice = createSlice({
  name: "candidates",
  initialState: { items: candidates },
  reducers: {
    addCandidate: (state, action) => {
      state.items.push(action.payload);
    },
    deleteCandidate: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addCandidate, deleteCandidate } = candidateSlice.actions;
export default candidateSlice.reducer;
