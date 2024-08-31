import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    getAllUsers: builder.query({
      query: () => ({
        url: `/api/v2/user/get`,
        method: "GET",
      }),
      providesTags: ["ChatApp"],
    }),

    // Get single users
    getSingleUsers: builder.query({
      query: (id) => ({
        url: `/api/v2/user/${id}`,
        method: "GET",
      }),
      providesTags: ["ChatApp"],
    }),

    // Delete user
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v2/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ChatApp"],
    }),

    // Update user
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v2/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ChatApp"],
    }),

    // Get users by ID array
    getUserByIDArray: builder.query({
      query: (userIds) => ({
        url: `/api/v2/user/array`,
        method: "POST",
        body: { userIds }, // Send the array of IDs in the body
      }),
      providesTags: (result, error, userIds) =>
        result ? [{ type: "ChatApp", id: userIds.join(",") }] : ["ChatApp"],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for using the endpoints in components
export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetSingleUsersQuery,
  useGetUserByIDArrayQuery,
} = userApi;

export default userApi;
