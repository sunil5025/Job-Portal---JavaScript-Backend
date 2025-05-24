// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/middlewares/db.js';

//config
dotenv.config();

//mongoDB connection
connectDB();

//rest Object
const app = express();



//routes
app.get('/', (req, res) => {
    res.send("<h1> Welcome to My Second Backend Project [ JOB PORTAL ] </h1>");
});



//PORT
const PORT = process.env.PORT || 8080;
const mode = process.env.DEV_MODE || "development";


//listen
app.listen(PORT, () => {
    console.log( `Node server is running in ${mode} Mode on Port no : ${PORT}`);
    console.log("Visit http://localhost:8080");
   
});


