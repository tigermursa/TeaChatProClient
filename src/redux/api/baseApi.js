import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://teachat-server.onrender.com",
    credentials: "include",
  }),
  tagTypes: ["ChatApp"],
  endpoints: () => ({}),
});
