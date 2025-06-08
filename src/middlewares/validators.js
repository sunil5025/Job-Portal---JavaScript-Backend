import { body } from "express-validator";
import { loginController } from "../controllers/userController.js";
import userModel from "../models/userModel.js";

const loginValidator = [
  body('email')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .trim().escape()
];

export { loginValidator };