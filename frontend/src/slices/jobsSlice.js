// src/features/jobs/jobsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    title: '',
    location: '',
    jobType: '',
    salaryMin: '',
    salaryMax: '',
  },
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { setFilters, resetFilters } = jobsSlice.actions;
export default jobsSlice.reducer;
