import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { sessionSlice, chatSlice } from "./index";
export const store = configureStore({
  reducer: {
    sessionSlice,
    chatSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
