import { baseApi } from "../../api/baseApi";

const thoughtApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //posting thought / Create
    addThought: builder.mutation({
      query: (data) => ({
        url: `/api/thought/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ChatApp"],
    }),

    // Get all users
    getAllThought: builder.query({
      query: () => `/api/thought/get`,
      method: "GET",
      providesTags: ["ChatApp"],
    }),

    // Delete user
    deleteThought: builder.mutation({
      query: (id) => ({
        url: `/api/thought/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ChatApp"],
    }),

    // Update user
    updateThought: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/thought/${id}`,
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
  useAddThoughtMutation,
} = thoughtApi;

export default thoughtApi;
