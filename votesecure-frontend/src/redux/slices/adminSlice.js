import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    stats: {
      voters: 2450,
      votes: 1982,
      turnout: 81,
      activeElections: 3,
    },
  },
  reducers: {},
});

export default adminSlice.reducer;
