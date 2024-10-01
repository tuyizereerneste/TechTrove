import Job from "../../models/jobSchema.js";
import CompanyUser from "../../models/Company.js";


class JobController {

    static async createJob(req, res) {
        try {
            const { title, description, requirements, location, deadline } = req.body;
            const companyId = req.companies.id; // Assuming req.companies is populated by auth middleware
        
            const newJob = new Job({ title, description, requirements, location, deadline, company: companyId });
            await newJob.save();
        
            // Add the job to the company's job list
            const company = await CompanyUser.findById(companyId);
            company.jobs.push(newJob._id);
            await company.save();
        
            res.status(201).json(newJob);
            console.log("Job created");
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
          }
        
    }

    static async companyJobs(req, res) {
        try {
            const companyId = req.companies.id; // Assuming req.user is populated by auth middleware
            const jobs = await Job.find({ company: companyId });
        
            res.status(200).json(jobs);
          } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
          }

    }

    static async companyDeleteJob(req, res) {
        try {
            const jobId = req.params.id;
            const companyId = req.companies.id;
        
            // Check if the job exists and belongs to the authenticated company
            const job = await Job.findOne({ _id: jobId, company: companyId });
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
    }

    static async companyUpdateJob(req, res) {
        try {
            const { title, description, requirements, location, deadline } = req.body;
            const jobId = req.params.id;
            const companyId = req.companies.id;
        
            // Check if the job exists and belongs to the authenticated company
            const job = await Job.findOne({ _id: jobId, company: companyId });
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
    }

    static async getAllJobs(req, res) {
        try {
            const jobs = await Job.find();
            res.json(jobs);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
          }
    }

    static async getJobById(req, res) {
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
    }
}

export default JobController;