import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ page, limit }) => ({
        url: `/posts?page=${page}&limit=${limit}`,
      }),
      providesTags: (result) =>
        result?.posts
          ? result.posts.map((post) => ({ type: "Post", id: post._id }))
          : [],
    }),
    getPost: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
      providesTags: (result) =>
        result ? [{ type: "Post", id: result._id }] : [],
    }),
    likePost: builder.mutation({
      query: (id) => ({
        method: "POST",
        url: `/posts/likes/${id}`,
      }),
      invalidatesTags: (result) => [{ type: "Post", id: result.id }],
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery, useLikePostMutation } =
  postApi;
