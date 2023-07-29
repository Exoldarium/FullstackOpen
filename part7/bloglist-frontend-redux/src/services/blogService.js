import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'api'
  }),
  tagTypes: ['Blogs', 'User'],
  endpoints: (builder) => ({
    blogs: builder.query({
      query: () => 'blogs',
      providesTags: ['Blogs']
    }),
    addBlog: builder.mutation({
      query: ({ newBlog, token }) => ({
        url: 'blogs',
        method: 'POST',
        body: newBlog,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      invalidatesTags: ['Blogs']
    }),
    updateBlog: builder.mutation({
      query: ({ newBlog, id, token }) => ({
        url: `blogs/${id}`,
        method: 'PUT',
        body: newBlog,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      invalidatesTags: ['Blogs']
    }),
    deleteBlog: builder.mutation({
      query: ({ id, token }) => ({
        url: `blogs/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      invalidatesTags: ['Blogs']
    }),
    userLogin: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['User']
    }),
  })
});

// the naming has to be exact because rtk query createas hooks in this way
// use<endpoint name><endpoint type>
export const {
  useBlogsQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useUserLoginMutation
} = blogApi;