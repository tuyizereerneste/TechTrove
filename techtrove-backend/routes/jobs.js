const express = require('express');
const mongoose = require('mongoose');
const Job = require('../models/jobSchema');
const CompanyUser = require('../models/User');
const auth = require('../middleware/auth'); // Assuming you have auth middleware for authentication
const router = express.Router();

// Route to create a job
router.post('/create', auth, async (req, res) => {
  try {
    const { title, description, requirements, location, deadline } = req.body;
    const userId = req.user.id; // Assuming req.user is populated by auth middleware

    const newJob = new Job({ title, description, requirements, location, deadline, company: userId });
    await newJob.save();

    // Add the job to the company's job list
    const company = await CompanyUser.findById(userId);
    company.jobs.push(newJob._id);
    await company.save();

    res.status(201).json(newJob);
    console.log("Job created");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/myjobs', auth, async (req, res) => {
    try {
      const userId = req.user.id; // Assuming req.user is populated by auth middleware
      const jobs = await Job.find({ company: userId });
  
      res.status(200).json(jobs);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  router.delete('/delete/:id', auth, async (req, res) => {
    try {
      const jobId = req.params.id;
      const userId = req.user.id;
  
      // Check if the job exists and belongs to the authenticated company
      const job = await Job.findOne({ _id: jobId, company: userId });
      if (!job) {
        return res.status(404).json({ msg: 'Job not found or unauthorized' });
      }
  
      // Delete the job
      await Job.deleteOne({ _id: jobId });
  
      res.json({ msg: 'Job deleted' });
      console.log("Job deleted");
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  router.put('/update/:id', auth, async (req, res) => {
    try {
      const { title, description, requirements, location, deadline } = req.body;
      const jobId = req.params.id;
      const userId = req.user.id;
  
      // Check if the job exists and belongs to the authenticated company
      const job = await Job.findOne({ _id: jobId, company: userId });
      if (!job) {
        return res.status(404).json({ msg: 'Job not found or unauthorized' });
      }
  
      // Update job fields
      job.title = title;
      job.description = description;
      job.requirements = requirements;
      job.location = location;
      job.deadline = deadline;
  
      // Save the updated job
      await job.save();
  
      res.json(job);
      console.log("Job updated");
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

 // Get all jobs
router.get('/allJobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//endpoint to get job details by ID
router.get('/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    console.error('Error fetching job details:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
  // Add more routes as needed (e.g., get a single job, update a job, delete a job)
  
  module.exports = router;