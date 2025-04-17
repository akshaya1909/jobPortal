import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateJobMutation, useUploadLogoMutation } from "../slices/jobsApi";
import Vector from '../assets/Vector.png';

const JobForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [createJob] = useCreateJobMutation();
  const [uploadLogo] = useUploadLogoMutation();
  const [logoFile, setLogoFile] = useState(null);

  const onSubmit = async (data) => {
    try {
      let uploadedLogoPath = "";

      if (logoFile) {
        const formData = new FormData();
        formData.append("logo", logoFile);
        const uploadRes = await uploadLogo(formData).unwrap();
        uploadedLogoPath = uploadRes.filePath; // this matches your backend
      }

      const jobData = {
        ...data,
        companyName: data.company,
        logo: uploadedLogoPath,
        salary: {
          from: Number(data.salaryMin),
          to: Number(data.salaryMax),
        },
        applicationDeadline: data.deadline,
      };

      delete jobData.company;
      delete jobData.salaryMin;
      delete jobData.salaryMax;
      delete jobData.deadline;

      await createJob(jobData).unwrap();

      reset();
      onClose();
    } catch (error) {
      console.error("Job creation failed:", error);
    }
  };

  return (
    <div className="form-overlay">
      <form className="create-job-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="header-div">
          <h2>Create Job Opening</h2>
          {/* <button type="button" className="close-btn" onClick={onClose}>
            &times;
          </button> */}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Job Title</label>
            <input 
            placeholder="Software Engineer, Java.."
            {...register("title", { required: true })} />
            {errors.title && <p className="error">Title is required</p>}
          </div>

          <div className="form-group">
            <label>Company Name</label>
            <input
            placeholder="Amazon, Microsoft, Swiggy"
             {...register("company", { required: true })} />
            {errors.company && <p className="error">Company is required</p>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Location</label>
            <select {...register("location", { required: true })}>
              <option value="">Choose Preferred Location</option>
              <option value="Chennai">Chennai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
            {errors.location && <p className="error">Location is required</p>}
          </div>

          <div className="form-group">
            <label>Job Type</label>
            <select {...register("jobType", { required: true })}>
              <option value="FullTime">FullTime</option>
              <option value="PartTime">PartTime</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
            {errors.jobType && <p className="error">Job type is required</p>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
          <label>Salary Range</label>
    <div className="salary-range-inputs">
      <input
        type="number"
        {...register("salaryMin")}
        placeholder="↑↓ 0"
      />
      <input
        type="number"
        {...register("salaryMax")}
        placeholder="↑↓ 12,00,000"
      />
    </div>
          </div>

          <div className="form-group">
            <label>Application Deadline</label>
            <input type="date" {...register("deadline")} />
          </div>
        </div>

        <div className="form-group">
          <label>Job Description</label>
          <textarea
            {...register("description")}
            rows="7"
            placeholder="Please share a description to let the candidate know more about the job role"
          ></textarea>
        </div>

        {/* <div className="form-group">
          <label>Company Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogoFile(e.target.files[0])}
          />
        </div> */}

        <div
          className="form-row"
          style={{justifyContent: 'space-between', marginTop: '16px' }}
        >
          <button type="button" onClick={onClose} className="cancel-btn">
            Save Draft 
            <img src={Vector}alt="icon" className="save-icon" />
          </button>
          <button type="submit" className="submit-btn">
            Publish »
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
