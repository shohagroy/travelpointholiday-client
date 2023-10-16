import attractionReducer from "./features/attraction/attractionSlice";
import { baseApi } from "./features/baseApi/apiSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  attraction: attractionReducer,
};
