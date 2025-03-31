import { configureStore } from "@reduxjs/toolkit";
import { o2API } from "./api";
import authSlice from "./features/auth/authSlice";
import tokenSlice from "./features/auth/tokenSlice";

import awardRankSlice from "./features/awardRank";
import awardTypeSlice from "./features/awardType";
import awardUuidSlice from "./features/awardUuid";
// create store
export const makeStore = () => {
  return configureStore({
    reducer: {
      [o2API.reducerPath]: o2API.reducer,

      auth: authSlice,
      token: tokenSlice,
      awardRank: awardRankSlice,
      awardType: awardTypeSlice,
      awardUuid: awardUuidSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(o2API.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
