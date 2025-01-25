import { apiSlice } from './apiSlices';
import { DEPARTMENTS_URL } from '../constants';

export const departmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => ({
        url: DEPARTMENTS_URL,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Department'],
    }),
   
    getDepartmentById: builder.query({
      query: (id) => ({
        url: `${DEPARTMENTS_URL}/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: (result, error, id) => [{ type: 'Department', id }],
    }),
    
    createDepartment: builder.mutation({
      query: (data) => ({
              url: DEPARTMENTS_URL,
              method: 'POST',
              body: data,
            }),
            keepUnusedDataFor: 5,
            invalidatesTags: ['Department'],
    }),
    
    updateDepartment: builder.mutation({
      query: ({ id, DepartmentName, DepartmentHead, Description, Image }) => {
        const formData = new FormData();
        formData.append('DepartmentName', DepartmentName);
        formData.append('DepartmentHead', DepartmentHead);
        formData.append('Description', Description);
        if (Image) {
          formData.append('Image', Image);
        }

        return {
          url: `${DEPARTMENTS_URL}/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Department', id }],
    }),
    
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `${DEPARTMENTS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Department', id }],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentsApiSlice;
