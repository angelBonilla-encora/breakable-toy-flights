import { createSlice } from "@reduxjs/toolkit";

interface CurrencyState {
  currency: "USD" | "MXN" | "EUR";
}

const initialState: CurrencyState = {
  currency: "USD",
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    selectCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { selectCurrency } = currencySlice.actions;
