import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFilters } from "../slices/jobsSlice";
import search from "../assets/search.png";
import location from "../assets/location.png";
import jobType from "../assets/jobType.png";
import dropdownArrow from "../assets/dropdown-arrow.png";

const Filter = () => {
  const dispatch = useDispatch();
  const [sliderValue, setSliderValue] = useState(50000);
  const [title, setTitle] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [jobTypeValue, setJobTypeValue] = useState('');

  const handleSliderChange = (e) => {
    console.log("salary",e.target.value)
    const value = Number(e.target.value);
    setSliderValue(value);
    dispatch(setFilters({ salaryMin: 50000, salaryMax: value }));
  };

  const getSliderStyle = () => {
    const percent = ((sliderValue - 50000) / (100000 - 50000)) * 100;
    return {
      background: `linear-gradient(to right, #222222 0%, #222222 ${percent}%, #CCC2C2 ${percent}%, #CCC2C2 100%)`,
    };
  };

  // Dispatch title, location, job type when they change
  useEffect(() => {
    dispatch(setFilters({ title, location: locationValue, jobType: jobTypeValue }));
  }, [title, locationValue, jobTypeValue, dispatch]);

  return (
    <section className="filter-container">
      <div className="filter-column">
        <img src={search} alt="Search" className="search-icon" />
        <input
          type="text"
          placeholder="Search By Job Title, Role"
          className="search-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="filter-divider" />

      <div className="filter-column">
        <div className="location-section">
          <img src={location} alt="location" className="location-icon" />
          <div className="location-dropdown">
            <select
              className="location-select"
              value={locationValue}
              onChange={(e) => setLocationValue(e.target.value)}
            >
              <option value="" disabled hidden>
                Preferred Location
              </option>
              <option value="Chennai">Chennai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
            <img src={dropdownArrow} alt="arrow" className="dropdown-arrow" />
          </div>
        </div>
      </div>

      <div className="filter-divider" />
      <div className="filter-column">
        <div className="jobtype-section">
          <img src={jobType} alt="job-type" className="jobtype-icon" />
          <div className="jobtype-dropdown">
            <select
              className="jobtype-select"
              value={jobTypeValue}
              onChange={(e) => setJobTypeValue(e.target.value)}
            >
              <option value="" disabled hidden>
                Job Type
              </option>
              <option value="FullTime">Full-time</option>
              <option value="PartTime">Part-time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
            <img src={dropdownArrow} alt="arrow" className="dropdown-arrow" />
          </div>
        </div>
      </div>

      <div className="filter-divider" />
      <div className="filter-column salary-column">
        <div className="salary-labels">
          <span className="salary-text">Salary Per Month</span>
          <span className="salary-value">₹50K - ₹{sliderValue / 1000}K</span>
        </div>
        <div className="slider-wrapper">
          <div className="fixed-thumb"></div>
          <input
            type="range"
            className="salary-slider"
            min="50000"
            max="100000"
            step="1000"
            value={sliderValue}
            onChange={handleSliderChange}
            style={getSliderStyle()}
          />
        </div>
      </div>
    </section>
  );
};

export default Filter;
