// src/redux/feature/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AccessTokenState = {
  token: string | null;
};

const initialState: AccessTokenState = {
  token: null,
};
const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },

    logout(state) {
      state.token = null;
    },
  },
});

export const { setAuthState, logout } = tokenSlice.actions;
export default tokenSlice.reducer;
