import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "@/lib/mock";

type OrdersState = {
  items: Order[];
};

const initialState: OrdersState = {
  items: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload;
    },
    addOrder: (state, action: PayloadAction<Omit<Order, "id">>) => {
      const nextId = state.items.length ? Math.max(...state.items.map(o => o.id)) + 1 : 1;
      state.items.unshift({ id: nextId, ...action.payload });
    },
    deleteOrder: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(o => o.id !== action.payload);
    },
  },
});

export const { setOrders, addOrder, deleteOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
