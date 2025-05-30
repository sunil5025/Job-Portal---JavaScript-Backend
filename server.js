// const express = require('express');
//packages imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
//files imports
import connectDB from './src/middlewares/db.js';

// routes imports
import testRoutes from './src/routes/testRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import { ApiError } from './src/utils/ApiError.js';
import { asyncHandler } from './src/utils/async_Handler.js';
import jobsRoutes from './src/routes/jobRoutes.js';




//config
dotenv.config();

//mongoDB connection
connectDB();

//rest Object
const app = express();

//middlewares
app.use(express.json());

//cors
app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    origin: true
}));

//morgan
app.use(morgan("dev"));



//routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/jobs', jobsRoutes);


//PORT
const PORT = process.env.PORT || 8080;
const mode = process.env.DEV_MODE || "development";


//listen
app.listen(PORT, () => {
    console.log( `Node server is running in ${mode} Mode on Port no : ${PORT}`);
    console.log("Visit http://localhost:8080");
   
});


