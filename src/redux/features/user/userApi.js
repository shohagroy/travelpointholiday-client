import { baseApi } from "../baseApi/apiSlice";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (data) => ({
        url: "/auth/create-user",
        method: "POST",
        data,
      }),
      invalidatesTags: ["users"],
    }),

    login: build.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useCreateUserMutation, useLoginMutation } = userApi;
