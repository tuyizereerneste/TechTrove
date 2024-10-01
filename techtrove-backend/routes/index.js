import { Router } from "express";
import verifyUser from "../middleware/auth.js";
import verifyCompany from "../middleware/verifyCompany.js";
import AuthUser from "../controllers/user/authUser.js";
import AuthCompany from "../controllers/user/authCompany.js";
import JobController from "../controllers/Job/JobController.js";
import ApplicationController from "../controllers/Job/ApplicationController.js";

const router = Router();

router.post('/api/user/user-register', AuthUser.registerUser);
router.post('/api/user/user-login', AuthUser.loginUser);
router.get('/api/user/user-profile', verifyUser, AuthUser.userProfile);
router.put('/api/user/user-update', verifyUser, AuthUser.userUpdate);

router.post('/api/company/register-company', AuthCompany.companyRegister);
router.post('api/company/company-login', AuthCompany.companyLogin);
router.post('/api/company/create-job', verifyCompany, JobController.createJob);
router.get('/api/company/my-posted-jobs', verifyCompany, JobController.companyJobs);
router.delete('/api/company/delete-job/:id', verifyCompany, JobController.companyDeleteJob);
router.put('/api/company/update-job', verifyCompany, JobController.companyUpdateJob);
router.get('/api/all-jobs', JobController.getAllJobs);

router.post('/api/user/user-apply', verifyUser, ApplicationController.userApplying);
router.post('/api/non-user/non-user-apply', ApplicationController.nonUserApplying);
router.get('/api/user/my-applications', verifyUser, ApplicationController.userMyApplications);
router.get('api/company/recieved-applications', verifyCompany, ApplicationController.recievedApplications);

export default router;
