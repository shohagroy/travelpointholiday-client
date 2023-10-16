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

    deleteAttraction: build.mutation({
      query: (id) => ({
        url: `/attractions/${id}`,
        method: "DELETE",
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

    getAttraction: build.query({
      query: (id) => ({
        url: `/attractions/${id}`,
        method: "GET",
      }),
      providesTags: ["attractions"],
    }),

    updateAttractionInfo: build.mutation({
      query: (data) => ({
        url: `/attractions/edit-info/${data?.id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["attractions"],
    }),

    removeAttractionImage: build.mutation({
      query: (data) => ({
        url: `/attractions/images/${data?.attractionId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["attractions"],
    }),

    uploadAttractionsImage: build.mutation({
      query: ({ id, data }) => ({
        url: `/attractions/images/${id}`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["attractions"],
    }),
  }),
});

export const {
  useCreateAttractionMutation,
  useGetAllAttractionsQuery,
  useDeleteAttractionMutation,
  useGetAttractionQuery,
  useUpdateAttractionInfoMutation,
  useRemoveAttractionImageMutation,
  useUploadAttractionsImageMutation,
} = attractionApi;
