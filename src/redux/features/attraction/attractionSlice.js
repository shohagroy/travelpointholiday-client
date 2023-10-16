import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: true,
};

const attractionSlice = createSlice({
  name: "attractions",
  initialState,
  reducers: {
    storeAttractionData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
  },
});

export const { storeAttractionData } = attractionSlice.actions;
export default attractionSlice.reducer;
