import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://teachat-server.onrender.com",
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["ChatApp"],
  endpoints: () => ({}),
});
