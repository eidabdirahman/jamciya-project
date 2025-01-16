import { apiSlice } from './apiSlices';
import { BLOGS_URL } from '../constants';

export const blogsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: BLOGS_URL,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Blog'],
    }),
   
    getBlogById: builder.query({
      query: (id) => ({
        url: `${BLOGS_URL}/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
    }),
    createBlog: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('publishedDate', data.publishedDate);
        if (data.image) {
          formData.append('image', data.image);
        }

        return {
          url: BLOGS_URL,
          method: 'POST',
          body: formData,
        };
      },
      keepUnusedDataFor: 5,
      invalidatesTags: ['Blog'],
    }),
    updateBlog: builder.mutation({
      query: ({ id, title, content, publishedDate, image }) => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('publishedDate', publishedDate);
        if (image) {
          formData.append('image', image);
        }

        return {
          url: `${BLOGS_URL}/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Blog', id }],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `${BLOGS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Blog', id }],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogsApiSlice;
