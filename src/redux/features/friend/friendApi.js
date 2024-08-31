import { baseApi } from "../../api/baseApi";

const friendApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //send friend request
    sentFriendRequest: builder.mutation({
      query: (data) => ({
        url: `/api/friend-request`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ChatApp"], // Invalidate ChatApp to refetch data
    }),

    //accept request
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: `/api/friend-request/accept`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ChatApp"], // Invalidate ChatApp to refetch data
    }),

    //reject request
    rejectFriendRequest: builder.mutation({
      query: (data) => ({
        url: `/api/friend-request/decline`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ChatApp"], // Invalidate ChatApp to refetch data
    }),
    getUserByIDArray: builder.query({
      query: (userIds) => ({
        url: `/api/v2/user/array`,
        method: "POST",
        body: { userIds }, 
      }),
      providesTags: ["ChatApp"],
    }),

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
export const {
  useGetNotMyFriendQuery,
  useSentFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
  useGetUserByIDArrayQuery,
} = friendApi;

export default friendApi;
