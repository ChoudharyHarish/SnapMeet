import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
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
      providesTags: [{ type: "Posts" }],
    }),
    getPost: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
      providesTags: [{ type: "Post" }],
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: `/user/post`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Posts" }],
    }),
    likePost: builder.mutation({
      query: (id) => ({
        method: "POST",
        url: `/posts/likes/${id}`,
      }),
      invalidatesTags: [{ type: "Posts" }, { type: "Post" }],
    }),
    addComment: builder.mutation({
      query: ({ id, comment }) => ({
        method: "POST",
        url: `/posts/comment/${id}`,
        body: { text: comment },
      }),
      invalidatesTags: [{ type: "Post" }, { type: "Posts" }],
    }),
    likeComment: builder.mutation({
      query: (id) => ({
        method: "POST",
        url: `/comments/${id}`,
      }),
      invalidatesTags: [{ type: "Post" }],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/comments/${id}`,
      }),
      invalidatesTags: [{ type: "Post" }, { type: "Posts" }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useAddCommentMutation,
  useLikeCommentMutation,
  useDeleteCommentMutation,
} = postApi;
