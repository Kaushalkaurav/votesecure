import { createSlice } from "@reduxjs/toolkit";

const savedVotes = JSON.parse(localStorage.getItem("votesecure_votes") || "{}");

const voteSlice = createSlice({
  name: "vote",
  initialState: {
    votedElections: savedVotes,
    loading: false,
  },
  reducers: {
    castVote: (state, action) => {
      const { electionId, candidateId } = action.payload;
      state.votedElections[electionId] = candidateId;
      localStorage.setItem("votesecure_votes", JSON.stringify(state.votedElections));
    },
  },
});

export const { castVote } = voteSlice.actions;
export default voteSlice.reducer;
