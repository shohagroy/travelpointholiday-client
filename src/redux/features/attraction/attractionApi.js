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

    getAllAttractions: build.query({
      query: (arg) => ({
        url: "/attractions",
        method: "GET",
        params: arg,
      }),
      providesTags: ["attractions"],
    }),
  }),
});

export const { useCreateAttractionMutation, useGetAllAttractionsQuery } =
  attractionApi;
