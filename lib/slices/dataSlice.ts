import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Row = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  status: "Active" | "Pending" | "Suspended";
};

type TableState = {
  rows: Row[];
  filter: string;
  sortKey: keyof Row | null;
  sortDir: "asc" | "desc";
  page: number;
  pageSize: number;
};

const initialState: TableState = {
  rows: [],
  filter: "",
  sortKey: null,
  sortDir: "asc",
  page: 1,
  pageSize: 8,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<Row[]>) => {
      state.rows = action.payload;
    },
    addRow: (state, action: PayloadAction<Omit<Row, "id" | "createdAt">>) => {
      const nextId = state.rows.length ? Math.max(...state.rows.map((r) => r.id)) + 1 : 1;
      state.rows.unshift({
        id: nextId,
        createdAt: new Date().toISOString().slice(0, 10),
        ...action.payload,
      });
    },
    deleteRow: (state, action: PayloadAction<number>) => {
      state.rows = state.rows.filter((r) => r.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
      state.page = 1;
    },
    setSort: (state, action: PayloadAction<{ key: keyof Row }>) => {
      if (state.sortKey === action.payload.key) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      } else {
        state.sortKey = action.payload.key;
        state.sortDir = "asc";
      }
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.page = 1;
    },
  },
});

export const { setRows, addRow, deleteRow, setFilter, setSort, setPage, setPageSize } =
  dataSlice.actions;
export default dataSlice.reducer;
