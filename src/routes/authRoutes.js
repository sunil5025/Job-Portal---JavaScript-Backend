import express from 'express';
import { loginController, registerController } from '../controllers/userController.js';
import { rateLimit } from 'express-rate-limit';
import { loginValidator } from '../middlewares/validators.js';
import { validationResult } from 'express-validator';



// ip// Rate Limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// router Object
const router = express.Router();

////// express-validator



//routes
//register
router.post('/register', limiter, registerController)

//login
router.post('/login', limiter, loginValidator, loginController , (req, res, next) => {
     // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Call controller
  login(req, res, next);
})

//logout




//export
export default router