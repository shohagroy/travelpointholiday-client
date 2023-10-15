import { baseApi } from "../baseApi/apiSlice";

export const attractionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAttraction: build.mutation({
      query: (data) => ({
        url: "/attractions/create",
        method: "POST",
        data,
      }),
      invalidatesTags: ["attractions"],
    }),
  }),
});

export const { useCreateAttractionMutation } = attractionApi;
