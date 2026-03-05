import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import dataReducer from "./slices/dataSlice";
import productsReducer from "./slices/productsSlice";
import clientsReducer from "./slices/clientsSlice";
import salesReducer from "./slices/salesSlice";
import ordersReducer from "./slices/ordersSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      data: dataReducer,
      products: productsReducer,
      clients: clientsReducer,
      sales: salesReducer,
      orders: ordersReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
