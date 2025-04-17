// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { jobsApi } from '../slices/jobsApi'; 
import jobsReducer from '../slices/jobsSlice'

export const store = configureStore({
  reducer: {
    [jobsApi.reducerPath]: jobsApi.reducer,
    jobs: jobsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobsApi.middleware),
});
