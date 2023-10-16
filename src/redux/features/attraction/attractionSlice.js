import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const attractionSlice = createSlice({
  name: "attractions",
  initialState,
  reducers: {
    storeAttractionData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { storeAttractionData } = attractionSlice.actions;
export default attractionSlice.reducer;
