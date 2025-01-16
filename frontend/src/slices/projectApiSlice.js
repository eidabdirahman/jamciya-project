import { PROJECTS_URL } from '../constants';
import { apiSlice } from './apiSlices';

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: PROJECTS_URL,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Project'],
    }),
   
    getProjectById: builder.query({
      query: (id) => ({
        url: `${PROJECTS_URL}/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: (result, error, id) => [{ type: 'Project', id }],
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: PROJECTS_URL,
        method: 'POST',
        body: data,
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation({
       query: ({ id, ProjectName, Description, StartDate, EndDate, ManagerID }) => ({
         url: `${PROJECTS_URL}/${id}`,
         method: 'PUT', 
         body: { ProjectName, Description, StartDate, EndDate, ManagerID }, 
        }), 
    invalidatesTags: (result, error, { id }) => [{ type: 'Project', id }], }),
    
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `${PROJECTS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Project', id }],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApiSlice;
