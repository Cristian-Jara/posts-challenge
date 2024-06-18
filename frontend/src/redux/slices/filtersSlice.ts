import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  [searchedColumn: string]: string;
}

const initialState: FilterState = {};

interface ActionPayload {
  text: string;
  column: string;
}

const filtersSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<ActionPayload>) => {
      state[action.payload.column] = action.payload.text;
    },
    resetFilter: (state, action: PayloadAction<string>) => {
      state[action.payload] = "";
    },
  },
});

export const { setSearch, resetFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
