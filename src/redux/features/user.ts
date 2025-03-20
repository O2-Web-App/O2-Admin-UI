import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  value: {};
};

const initialState: UserState = {
  value: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
