import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Sale } from "@/lib/mock";

type SalesState = {
  items: Sale[];
};

const initialState: SalesState = {
  items: [],
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setSales: (state, action: PayloadAction<Sale[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setSales } = salesSlice.actions;
export default salesSlice.reducer;
