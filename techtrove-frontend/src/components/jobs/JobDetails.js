import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jobService from '../../services/jobService';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJob();
  }, [id]);

  const handleDelete = async () => {
    try {
      await jobService.deleteJob(id);
      navigate('/company-dashboard');
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleUpdate = () => {
    navigate(`/update-job/${id}`);
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <p>{job.requirements.join(', ')}</p>
      <p>{job.location}</p>
      <p>{new Date(job.deadline).toLocaleDateString()}</p>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default JobDetails;