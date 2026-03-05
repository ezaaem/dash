import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Client } from "@/lib/mock";

type ClientsState = {
  items: Client[];
};

const initialState: ClientsState = {
  items: [],
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClients: (state, action: PayloadAction<Client[]>) => {
      state.items = action.payload;
    },
    addClient: (state, action: PayloadAction<Omit<Client, "id">>) => {
      const nextId = state.items.length ? Math.max(...state.items.map(c => c.id)) + 1 : 1;
      state.items.unshift({ id: nextId, ...action.payload });
    },
    deleteClient: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(c => c.id !== action.payload);
    },
  },
});

export const { setClients, addClient, deleteClient } = clientsSlice.actions;
export default clientsSlice.reducer;
