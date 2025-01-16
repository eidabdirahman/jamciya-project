import { apiSlice } from './apiSlices';
import { VIDEOGALLERY_URL } from '../constants';

export const videosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => ({
        url: VIDEOGALLERY_URL,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Video'],
    }),

    getVideoById: builder.query({
      query: (id) => ({
        url: `${VIDEOGALLERY_URL}/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: (result, error, id) => [{ type: 'Video', id }],
    }),
    createVideo: builder.mutation({
      query: (data) => ({
        url: VIDEOGALLERY_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Video'],
    }),
    updateVideo: builder.mutation({
      query: ({ id, title, description, videoId }) => ({
        url: `${VIDEOGALLERY_URL}/${id}`,
        method: 'PUT',
        body: { title, description, videoId },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Video', id }],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `${VIDEOGALLERY_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Video', id }],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoByIdQuery,
  useCreateVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} = videosApiSlice;
