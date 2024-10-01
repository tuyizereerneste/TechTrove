import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CreateJob from './CreateJob';

const UpdateJob = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJobData(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (!jobData) {
    return <div>Loading...</div>;
  }

  return <CreateJob initialData={jobData} />;
};

export default UpdateJob;