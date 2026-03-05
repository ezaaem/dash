import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/lib/mock";

type ProductsState = {
  items: Product[];
};

const initialState: ProductsState = {
  items: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    addProduct: (state, action: PayloadAction<Omit<Product, "id">>) => {
      const nextId = state.items.length ? Math.max(...state.items.map(p => p.id)) + 1 : 1;
      state.items.unshift({ id: nextId, ...action.payload });
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
  },
});

export const { setProducts, addProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
