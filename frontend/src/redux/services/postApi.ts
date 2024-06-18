import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DEFAULT_BACKEND_HOST } from "../../utils/constants";

// Define a service using a base URL and expected endpoints
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.BACKEND_HOST || DEFAULT_BACKEND_HOST}/posts`,
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Posts"],
    }),
    getPosts: builder.query<Post[], string>({
      query: () => "/",
      providesTags: ["Posts"],
    }),
    getPostsByName: builder.query<Post[], string>({
      query: (name: string) => `/${name}`,
      providesTags: ["Posts"],
    }),
    updatePost: builder.mutation<Post, Partial<Post>>({
      query: (data) => ({
        url: `/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation<Post, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useGetPostsByNameQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
