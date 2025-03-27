import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AwardUuid = {
  value: string;
};

const initialState: AwardUuid = {
  value: "",
};

export const awardUuidSlice = createSlice({
  name: "awardUuid",
  initialState,
  reducers: {
    setAwardUuid: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setAwardUuid } = awardUuidSlice.actions;
export default awardUuidSlice.reducer;
