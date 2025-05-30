import express from 'express';

import { userAuthentication } from '../middlewares/authMiddleware.js';
import { updateUserProfiles } from '../controllers/userProfileController.js';




// router Object
const router = express.Router();




// routes
//get user profile/ get





//update user profile//put
router.put('/update-user', userAuthentication, updateUserProfiles);







//export
export default router;
// This file is intentionally left empty as a placeholder for future user-related routes.