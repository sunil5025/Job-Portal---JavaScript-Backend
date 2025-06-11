// API Documentation: import
import swaggerUi from 'swagger-ui-express';      // swagger-ui-express is used to serve the Swagger UI
import swaggerDoc from 'swagger-jsdoc';         // swagger-jsdoc is used to generate Swagger documentation from JSDoc comments
//packages imports
import express from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

//security packages
import helmet  from 'helmet';
// import xssClean from "xss-clean";                        [it is not working properly in this version of nodejs, so commented it out]
// import mongoSanitize from 'express-mongo-sanitize';      [it is not working properly in this version of nodejs, so commented it out]
import limiter from './src/routes/authRoutes.js'; // Assuming you have a rate limiter defined in authRoutes.js

//files imports
import connectDB from './src/middlewares/db.js';

// routes imports
import testRoutes from './src/routes/testRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
// import { ApiError } from './src/utils/ApiError.js';
// import { asyncHandler } from './src/utils/async_Handler.js';
import jobsRoutes from './src/routes/jobRoutes.js';




/////config
dotenv.config();

//////mongoDB connection
connectDB();


//swagger api configuration
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "Job Portal Application",
            description: "Node Express MongoDB Job Portal Application"
        },
        servers: [
            {
                url: "http://localhost:8080"
            },
        ],
    },
    apis: ["./src/routes/*.js"], // Path to the API docs     [ /*.js is used to include all js files in the routes folder]
};
const swaggerSpec = swaggerDoc(options);

//rest Object
const app = express();

////// middlewares
app.use(express.json());

//cors
app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    origin: true
}));

//morgan
app.use(morgan("dev"));

//helmet
app.use(helmet());
//xss-clean           [it is not working properly in this version of nodejs, so commented it out]
// app.use(xssClean());
//mongoSanitize for sanitizing data     [   it is not working properly in this version of nodejs, so commented it out]
// app.use(mongoSanitize());
// Apply the rate limiting middleware to all requests.
app.use(limiter)


//////routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/jobs', jobsRoutes);

///// home route root
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // API Documentation route


/////PORT
const PORT = process.env.PORT || 8080;
const mode = process.env.DEV_MODE || "development";


/////listen
app.listen(PORT, () => {
    console.log( `Node server is running in ${mode} Mode on Port no : ${PORT}`);
    console.log("Visit http://localhost:8080");
   
});


