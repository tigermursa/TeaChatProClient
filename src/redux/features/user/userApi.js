import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    getAllUser: builder.query({
      query: () => `/api/v2/user/get`,
      method: "GET",
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
  }),
  overrideExisting: false,
});

// Export hooks for using the endpoints in components
export const {
  useGetAllUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;

export default userApi;
