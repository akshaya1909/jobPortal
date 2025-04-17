import React from "react";
import "../css/JobList.css";
import { useSelector } from "react-redux";
import { useGetJobsQuery } from "../slices/jobsApi";
import Card from "./Card";

const JobListing = () => {
  const filters = useSelector((state) => state.jobs.filters);
  const { data: jobs = [], isLoading, isError, error } = useGetJobsQuery(filters);

  console.log("jobs came in joblisitng",jobs)

  return (
    <div className="job-list-container">
      {isLoading && <p>Loading jobs...</p>}
      {isError && <p>Error: {error?.message}</p>}
      {!isLoading && jobs.length === 0 && <p>No jobs found.</p>}
      {!isLoading &&
        jobs.map((job) => (
          <Card key={job._id} jobData={job} />
        ))}
    </div>
  );
};

export default JobListing;
