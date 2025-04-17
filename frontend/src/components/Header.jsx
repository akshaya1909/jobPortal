import React from 'react'
import logo from '../assets/logo.png'
import { useState } from 'react';
import JobForm from './JobForm';
import JobDashboard from './JobDashboard';

const Header = ({ onCreateClick }) => {
  return (
    <header className="custom-header">
        <div className="inner-layout">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="nav-box">
  <span className="nav-item">Home</span>
  <span className="nav-item">Find Jobs</span>
  <span className="nav-item">Find Talents</span>
  <span className="nav-item">About Us</span>
  <span className="nav-item">Testimonials</span>
</div>

{/* 3. Right Hug Box */}
<div className="right-box"> 
  <button onClick={onCreateClick} className="create-btn">Create Jobs</button>
</div>
      </div>
    </header>
  )
}

export default Header