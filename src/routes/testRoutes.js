import express from 'express';
import {testPostController} from "../controllers/testController.js";
import {userAuthentication} from '../middlewares/authMiddleware.js';


// router Object
const router = express.Router()



// routes
router.post("/test-post", userAuthentication,  testPostController);



//export
export default router