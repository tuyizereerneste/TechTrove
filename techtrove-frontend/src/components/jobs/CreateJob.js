import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jobService from '../services/jobService';

const CreateJob = ({ initialData = {} }) => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    deadline: '',
    ...initialData,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData._id) {
        await jobService.updateJob(initialData._id, jobData);
      } else {
        await jobService.createJob(jobData);
      }
      navigate('/company-dashboard');
    } catch (error) {
      console.error('Error submitting job:', error);
    }
  };

  useEffect(() => {
    if (initialData.requirements) {
      setJobData((prevData) => ({
        ...prevData,
        requirements: initialData.requirements.join(', '),
      }));
    }
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={jobData.title}
        onChange={handleChange}
        placeholder="Job Title"
        required
      />
      <textarea
        name="description"
        value={jobData.description}
        onChange={handleChange}
        placeholder="Job Description"
        required
      />
      <input
        type="text"
        name="requirements"
        value={jobData.requirements}
        onChange={handleChange}
        placeholder="Requirements (comma separated)"
        required
      />
      <input
        type="text"
        name="location"
        value={jobData.location}
        onChange={handleChange}
        placeholder="Location"
        required
      />
      <input
        type="datetime-local"
        name="deadline"
        value={jobData.deadline}
        onChange={handleChange}
        required
      />
      <button type="submit">{initialData._id ? 'Update Job' : 'Create Job'}</button>
    </form>
  );
};

export default CreateJob;