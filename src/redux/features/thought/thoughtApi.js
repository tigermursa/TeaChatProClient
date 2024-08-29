import { baseApi } from "../../api/baseApi";

const thoughtApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    getAllThought: builder.query({
      query: () => `/api/v1/thought/get`,
      method: "GET",
      providesTags: ["ChatApp"],
    }),

    // Delete user
    deleteThought: builder.mutation({
      query: (id) => ({
        url: `/api/v1/thought/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ChatApp"],
    }),

    // Update user
    updateThought: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/thought/${id}`,
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
  useGetAllThoughtQuery,
  useDeleteThoughtMutation,
  useUpdateThoughtMutation,
} = thoughtApi;

export default thoughtApi;
