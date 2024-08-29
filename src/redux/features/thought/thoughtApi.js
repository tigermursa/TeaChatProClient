import { baseApi } from "../../api/baseApi";

const thoughtApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Posting thought / Create
    addThought: builder.mutation({
      query: (data) => ({
        url: `/api/thought/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ChatApp"], // Invalidate ChatApp to refetch data
    }),

    // Get all thoughts
    getAllThought: builder.query({
      query: () => `/api/thought/get`,
      method: "GET",
      providesTags: ["ChatApp"], // Provide the tag for cache
    }),

    // Get a single thought
    getSingleThought: builder.query({
      query: (id) => ({
        url: `/api/thought/${id}`,
        method: "GET",
      }),
      providesTags: ["ChatApp"], // Provide the tag for cache
    }),

    // Get thoughts by user ID
    getThoughtByUserId: builder.query({
      query: (id) => ({
        url: `/api/thought/info/${id}`,
        method: "GET",
      }),
      providesTags: ["ChatApp"], // Provide the tag for cache
    }),

    // Delete a thought
    deleteThought: builder.mutation({
      query: (id) => ({
        url: `/api/thought/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ChatApp"], // Invalidate ChatApp to refetch data
    }),

    // Update a thought
    updateThought: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/thought/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ChatApp"], // Invalidate ChatApp to refetch data
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
  useGetSingleThoughtQuery,
  useGetThoughtByUserIdQuery,
} = thoughtApi;

export default thoughtApi;
