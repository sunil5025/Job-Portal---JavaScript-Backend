import express from 'express';
import { loginController, registerController } from '../controllers/userController.js';


// router Object
const router = express.Router();



//routes
//register
router.post('/register', registerController)

//login
router.post('/login', loginController)

//logout




//export
export default router