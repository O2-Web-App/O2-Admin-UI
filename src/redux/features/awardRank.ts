import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AwardRank = {
  value: string;
};

const initialState: AwardRank = {
  value: "",
};

export const awardRankSlice = createSlice({
  name: "awardRank",
  initialState,
  reducers: {
    setAwardRank: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setAwardRank } = awardRankSlice.actions;
export default awardRankSlice.reducer;
