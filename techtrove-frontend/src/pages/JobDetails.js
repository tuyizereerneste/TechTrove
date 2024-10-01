import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jobService from '../services/jobService';

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobDetails();
  }, []);

  const fetchJobDetails = async () => {
    try {
      const data = await jobService.getJob(jobId);
      setJob(data);
    } catch (err) {
      console.error('Error fetching job details:', err);
    }
  };

  const handleUpdateJob = () => {
    // Navigate to update job form or implement inline editing
  };

  const handleDeleteJob = async () => {
    try {
      await jobService.deleteJob(jobId);
      navigate.push('/company-dashboard');
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <p>{job.requirements.join(', ')}</p>
      <p>{job.location}</p>
      <p>Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
      <button onClick={handleUpdateJob}>Update Job</button>
      <button onClick={handleDeleteJob}>Delete Job</button>
    </div>
  );
};

export default JobDetails;