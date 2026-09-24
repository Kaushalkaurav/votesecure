import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import electionReducer from "./slices/electionSlice";
import candidateReducer from "./slices/candidateSlice";
import voteReducer from "./slices/voteSlice";
import adminReducer from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    elections: electionReducer,
    candidates: candidateReducer,
    vote: voteReducer,
    admin: adminReducer,
  },
});
