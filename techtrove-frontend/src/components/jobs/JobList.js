import React, { useEffect, useState } from 'react';
import jobService from '../../services/jobService';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobService.getAllJobs();
        setJobs(data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Job Listings</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>{job.location}</p>
            <h5>Job requirements:</h5>
            <li>{job.requirements}</li>
            <p>Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;