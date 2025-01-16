import { apiSlice } from './apiSlices';
import { PARTNERS_URL } from '../constants';

export const partnersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPartners: builder.query({
      query: () => ({
        url: PARTNERS_URL,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Partner'],
    }),

    getPartnerById: builder.query({
      query: (id) => ({
        url: `${PARTNERS_URL}/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: (result, error, id) => [{ type: 'Partner', id }],
    }),
    createPartner: builder.mutation({
      query: (data) => ({
        url: PARTNERS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Partner'],
    }),
    updatePartner: builder.mutation({
      query: ({ id, name, description, website, image }) => ({
        url: `${PARTNERS_URL}/${id}`,
        method: 'PUT',
        body: { name, description, website, image },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Partner', id }],
    }),
    deletePartner: builder.mutation({
      query: (id) => ({
        url: `${PARTNERS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Partner', id }],
    }),
  }),
});

export const {
  useGetPartnersQuery,
  useGetPartnerByIdQuery,
  useCreatePartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} = partnersApiSlice;
