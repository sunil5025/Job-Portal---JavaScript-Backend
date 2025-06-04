import express from 'express';
import {userAuthentication} from '../middlewares/authMiddleware.js';
import { createJobController, updateJobController, getAllJobsController, deleteJobController } from '../controllers/jobsController.js';




const router = express.Router();


//routes
// create a job || post
router.post('/create-job', userAuthentication, createJobController)


// get all jobs || get
router.get('/get-job', userAuthentication, getAllJobsController)


// update job || put || patch
router.patch('/update-job/:id', userAuthentication, updateJobController)

// delete job || delete
router.delete('/delete-job/:id', userAuthentication, deleteJobController)

export default router;