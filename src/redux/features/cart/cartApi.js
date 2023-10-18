import { baseApi } from "../baseApi/apiSlice";
import { storeCartData } from "./cartSlice";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addToCart: build.mutation({
      query: (data) => ({
        url: "/carts/add-to-cart",
        method: "POST",
        data,
      }),
      invalidatesTags: ["carts"],
    }),

    removeToCart: build.mutation({
      query: (data) => ({
        url: "/carts/remove-to-cart",
        method: "POST",
        data,
      }),
      invalidatesTags: ["carts"],
    }),

    decrementCartItems: build.mutation({
      query: (data) => ({
        url: "/carts/decrement-cart-items-quantity",
        method: "POST",
        data,
      }),
      invalidatesTags: ["carts"],
    }),

    getUserCarts: build.query({
      query: () => ({
        url: "/carts/get-users-cart",
        method: "GET",
      }),
      providesTags: ["carts"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.data.length) {
            return dispatch(storeCartData(result?.data?.data));
          }
        } catch (err) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useAddToCartMutation,
  useRemoveToCartMutation,
  useGetUserCartsQuery,
  useDecrementCartItemsMutation,
} = cartApi;
