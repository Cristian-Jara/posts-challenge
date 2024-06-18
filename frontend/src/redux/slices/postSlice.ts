import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Post = {
  name: "",
  description: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
  },
});

export const { setName, setDescription } = postSlice.actions;
export default postSlice.reducer;
