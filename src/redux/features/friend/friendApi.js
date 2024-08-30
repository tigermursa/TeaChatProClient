import { baseApi } from "../../api/baseApi";

const friendApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // addThought: builder.mutation({
    //   query: (data) => ({
    //     url: `/api/thought/create`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["ChatApp"], // Invalidate ChatApp to refetch data
    // }),

    // Get not my friend by user ID
    getNotMyFriend: builder.query({
      query: (id) => ({
        url: `/api/non-friends/${id}`,
        method: "GET",
      }),
      providesTags: ["ChatApp"], // Provide the tag for cache
    }),
  }),
  overrideExisting: false,
});

// Export hooks for using the endpoints in components
export const { useGetNotMyFriendQuery } = friendApi;

export default friendApi;
