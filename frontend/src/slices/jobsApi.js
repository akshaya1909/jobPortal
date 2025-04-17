// src/features/jobs/jobsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['Jobs'], 
  endpoints: () => ({}),
});

export const extendedJobsApi = jobsApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (filters) => {
        const params = new URLSearchParams(filters).toString();
        return `/jobs?${params}`;
      },
      providesTags: ['Jobs'],
    }),
    createJob: builder.mutation({
        query: (jobData) => ({
          url: '/jobs',
          method: 'POST',
          body: jobData,
        }),
        // Invalidate 'Jobs' cache so useGetJobsQuery auto-refetches
        invalidatesTags: ['Jobs'],
      }),
    uploadLogo: builder.mutation({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetJobsQuery,
  useCreateJobMutation,
  useUploadLogoMutation,
} = extendedJobsApi;
