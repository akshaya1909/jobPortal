import React from 'react';
import { formatDistanceToNow } from "date-fns";
import { differenceInMinutes, differenceInHours, differenceInDays } from "date-fns";
import exp_icon from '../assets/exp-icon.png';
import onsite_icon from '../assets/onsite-icon.png';
import salary_icon from '../assets/salary-icon.png';

const Card = ({ jobData }) => {
  const {
    title,
    location,
    logo,
    salary,
    companyName,
    jobType,
    description,
    createdAt,
    experience, // Optional field
  } = jobData;

  const formattedSalary = `${Math.round(salary?.to / 100000)} LPA`;
  const createdDate = new Date(createdAt);
const now = new Date();

const minutesDiff = differenceInMinutes(now, createdDate);
const hoursDiff = differenceInHours(now, createdDate);
const daysDiff = differenceInDays(now, createdDate);

let postedAgo;
if (minutesDiff < 1) {
  postedAgo = "Just now";
} else if (minutesDiff < 60) {
  postedAgo = `${minutesDiff}m Ago`;
} else if (hoursDiff < 24) {
  postedAgo = `${hoursDiff}h Ago`;
} else {
  postedAgo = `${daysDiff}d Ago`;
}


  return (
    <div className="card">
      <div className="inner-division-1">
        <img src={logo} alt={`${companyName} Logo`} className="icon-img" />
        <div className="time-box">
          <span className="time-text">{postedAgo}</span>
        </div>
      </div>

      <h2 className="card-role-title">{title}</h2>

      <div className="card-description">
        {experience && (
          <div className="desc-item">
            <img src={exp_icon} alt="Experience Icon" className="desc-icon" />
            <span className="desc-text">{experience} yr Exp</span>
          </div>
        )}

        <div className="desc-item">
          <img src={onsite_icon} alt="Location Icon" className="desc-icon" />
          <span className="desc-text">{jobType}</span>
        </div>

        <div className="desc-item">
          <img src={salary_icon} alt="Salary Icon" className="desc-icon" />
          <span className="desc-text">{formattedSalary}</span>
        </div>
      </div>

      <div className="job-description">
        <ul>
          {description?.split(',').map((point, idx) => (
            <li key={idx}>{point.trim()}</li>
          ))}
        </ul>
      </div>

      <button className="apply-button">Apply Now</button>
    </div>
  );
};

export default Card;
