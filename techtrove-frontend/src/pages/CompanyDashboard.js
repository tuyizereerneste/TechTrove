import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jobService from '../services/jobService';

const CompanyDashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await jobService.getCompanyJobs();
      setJobs(data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  return (
    <div>
      <h2>Company Dashboard</h2>
      <Link to="/create-job">Create New Job</Link>
      <h3>My Jobs</h3>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <Link to={`/jobs/${job._id}`}>{job.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyDashboard;
