import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jobs';

const getAllJobs = async () => {
  const response = await axios.get(`${API_URL}/allJobs`);
  return response.data;
};

const getCompanyJobs = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/myjobs`, {
      headers: { 'x-auth-token': token },
    });
    return response.data;
  };
  
  const getJob = async (jobId) => {
    const response = await axios.get(`${API_URL}/${jobId}`);
    return response.data;
  };
  
  const createJob = async (jobData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/create`, jobData, {
      headers: { 'x-auth-token': token },
    });
    return response.data;
  };
  
  const deleteJob = async (jobId) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/delete/${jobId}`, {
      headers: { 'x-auth-token': token },
    });
    return response.data;
  };
  

const jobService = {
  getAllJobs,
  getCompanyJobs,
  getJob,
  createJob,
  deleteJob,
};

export default jobService;
