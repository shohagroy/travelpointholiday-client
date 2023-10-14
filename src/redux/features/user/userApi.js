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

    updateInfo: build.mutation({
      query: (data) => ({
        url: "/users/update-info",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["users"],
    }),

    getUserProfile: build.query({
      query: (data) => ({
        url: "/users/get-profile",
        method: "GET",
        data,
      }),
      providesTags: ["users"],
    }),

    changeUserPassword: build.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useUpdateInfoMutation,
  useGetUserProfileQuery,
  useChangeUserPasswordMutation,
} = userApi;
