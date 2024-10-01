import Job from '../../models/jobSchema.js';
import Application from '../../models/JobApplication.js';
import ApplicantApplication from '../../models/ApplicantApplication.js';

class ApplicationController {

    static async userApplying(req, res) {
        try {
            const { jobId } = req.body;
            const userId = req.user.id;
        
            const newApplication = new Application({ applicant: userId, job: jobId });
            await newApplication.save();
        
            const job = await Job.findById(jobId);
            job.applicants.push(userId);
            await job.save();
        
            res.status(201).json({ msg: 'Application submitted successfully' });
          } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
          }
    }

    static async nonUserApplying(req, res) {
        try {
            const { name, email, resume, coverLetter } = req.body;
            const jobId = req.params.jobId;
        
            const newApplication = new ApplicantApplication({ name, email, resume, coverLetter, job: jobId });
            await newApplication.save();
        
            const job = await Job.findById(jobId);
            job.anonymousApplicants.push(newApplication._id);
            await job.save();
        
            res.status(201).json({ msg: 'Application submitted successfully' });
          } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
          }
    }

    static async userMyApplications(req, res) {
        try {
            const applicantId = req.user.id;
        
            const applications = await Application.find({ applicant: applicantId }).populate('job');
            res.json(applications);
          } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
          }
    }

    static async recievedApplications(req, res) {
        try {
            const job = await Job.findById(req.params.jobId);
            
            if (!job) {
              return res.status(404).json({ msg: 'Job not found' });
            }
        
            // Check if the requesting user is the owner of the job
            if (job.company.toString() !== req.user.id) {
              return res.status(403).json({ msg: 'Not authorized' });
            }
        
            // Fetch applications for the job
            const registeredApplications = await Application.find({ job: req.params.jobId }).populate('applicant', '-password');
            const anonymousApplications = await ApplicantApplication.find({ job: req.params.jobId });
        
            // Combine both types of applications
            const allApplications = registeredApplications.concat(anonymousApplications);
        
            res.json(allApplications);
          } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
          }
    }
}

export default ApplicationController;