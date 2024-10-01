import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CompanyDashboard from './pages/CompanyDashboard';
import CreateJobFormPage from './pages/CreateJobFormPage';
import JobDetails from './components/jobs/JobDetails';
import UpdateJob from './components/jobs/UpdateJob';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/company-dashboard" element={<CompanyDashboard/>} />
      <Route path="/create-job" element={<CreateJobFormPage />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/update-job/:id" element={<UpdateJob />} />
    </Routes>
  </Router>
  );
};

export default App;
