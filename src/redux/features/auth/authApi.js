import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create user
    register: builder.mutation({
      query: (data) => ({
        url: `/auth/signup`,
        method: "POST",
        body: data,
      }),
    }),

    // Get single user
    getUser: builder.query({
      query: (id) => ({
        url: `/api/v2/user/${id}`,
        method: "GET",
      }),
    }),

    // Login user
    login: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
    }),

    // Logout user
    logout: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
    }),
  }),
});

// Export hooks for using the endpoints in components
export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useLogoutMutation,
} = authApi;

export default authApi;
