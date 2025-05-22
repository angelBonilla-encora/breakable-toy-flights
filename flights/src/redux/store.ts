import { configureStore } from "@reduxjs/toolkit";
import { flightsApi } from "./api/flightsApi";
import { currencySlice } from "./slices/currencySlice";

export const store = configureStore({
  reducer: {
    currency: currencySlice.reducer,
    [flightsApi.reducerPath]: flightsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(flightsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
