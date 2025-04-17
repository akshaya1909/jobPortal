import React from 'react'
import Header from './components/Header'
import  './css/Header.css'
import Filter from './components/Filter'
import './css/Filter.css'
import Card from './components/Card'
import './css/Card.css'
import './css/JobForm.css'
import JobListing from './components/JobListing'
import JobDashboard from './components/JobDashboard'
import JobForm from './components/JobForm'
import { useState } from 'react'

const App = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
    <Header onCreateClick={() => setShowForm(true)}/>
    <Filter/>
    {/* <JobDashboard/> */}
    {showForm && <JobForm onClose={() => setShowForm(false)} />}
    <JobListing/>
    </>
  )
}

export default App