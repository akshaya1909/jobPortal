// src/features/jobs/jobsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
  tagTypes: ['Jobs'], 
  endpoints: () => ({}),
});

export const extendedJobsApi = jobsApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (filters) => {
        const params = new URLSearchParams(filters).toString();
        return `/api/jobs?${params}`;
      },
      providesTags: ['Jobs'],
    }),
    createJob: builder.mutation({
        query: (jobData) => ({
          url: '/api/jobs',
          method: 'POST',
          body: jobData,
        }),
        // Invalidate 'Jobs' cache so useGetJobsQuery auto-refetches
        invalidatesTags: ['Jobs'],
      }),
    uploadLogo: builder.mutation({
      query: (formData) => ({
        url: '/api/upload',
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
