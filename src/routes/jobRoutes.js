import express from 'express';
import {userAuthentication} from '../middlewares/authMiddleware.js';
import { createJobController } from '../controllers/jobsController.js';




const router = express.Router();


//routes
// crete a job || post
router.post('/create-job', userAuthentication, createJobController)



export default router;