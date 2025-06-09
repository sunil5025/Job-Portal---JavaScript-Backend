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



///routes

// swagger api documentation
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: Object
 *      required:
 *        - name
 *        - lastName
 *        - email
 *        - password
 *        - location
 *        - age
 *        - phoneNumber
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the user collection
 *          example: 1234567890abcdef12345678
 *        name:
 *          type: string
 *          description: User's first name
 *        lastName:
 *          type: string
 *          description: user's last name
 *        email:
 *          type: string
 *          description: User's email address
 *        location:
 *          type: string
 *          description: User's location city or country 
 *        password:
 *          type: string
 *          description: User's password should be at least 6 characters long
 *        age:
 *          type: string
 *          description: User's age must be more than 18
 *        phoneNumber:
 *          type: string
 *          description: User's phone number must be a valid phone number
 *      example:
 *        id: 1234567890abcdef12345678
 *        name: Har Har
 *        lastName: Mahadev
 *        email: harharmahadev1@gmail.com
 *        password: 123456
 *        location: Kashi Vishwanath Temple, Varanasi, India
 *        age: Infinity
 *        phoneNumber: +91-9999999999
 */


/**
 * @swagger
 * tags:
 *   name: auth
 *   description: authentication apis
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *    post:
 *      summary: register a new user 
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: User registered successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        500:
 *         description: Internal server error
 */



//register
router.post('/register', limiter, registerController)


/**
 * @swagger
 * /api/v1/auth/login:
 *    post:
 *      summary: login a user
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: User logged in successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        500:      
 *          description: Something went wrong
 */

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