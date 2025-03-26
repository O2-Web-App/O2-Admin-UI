import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AwardType = {
  value: string;
};

const initialState: AwardType = {
  value: "",
};

export const awardTypeSlice = createSlice({
  name: "awardType",
  initialState,
  reducers: {
    setAwardType: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setAwardType } = awardTypeSlice.actions;
export default awardTypeSlice.reducer;
