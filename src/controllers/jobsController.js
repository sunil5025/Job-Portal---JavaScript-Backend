import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jobsModel from "../models/jobsModel.js";
import { asyncHandler } from "../utils/async_Handler.js";
import mongoose from "mongoose";
import moment from "moment";


////////// Create a job controller //////////
// This controller handles the creation of a job posting.

const createJobController = asyncHandler(async(req, res) => {

    const { company, position, workLocation, workType} = req.body
    // console.log("Request body for create job:", req.body);

    if(!company || !position || !workLocation || !workType){
        // console.log("Missing fields in request body");
        throw new ApiError(404, "Please provide all the fields");
    }

    // const userId = req.user._id;
    // console.log("Authenticated user ID:", userId);
    req.body.createdBy = req.user._id;
    
    const job = await jobsModel.create(req.body);
    // console.log("Job created:", job);
    res.status(201).json(
        new ApiResponse(true, 201, {message: "Job created successfully", job})
    )


});



////////// Get all jobs controller //////////
// This controller retrieves all job postings created by the authenticated user.
const getAllJobsController = asyncHandler(async(req, res) => {
    const jobs = await jobsModel.find({createdBy: req.user._id})
    if(!jobs){
        throw new ApiError(404, "No jobs found");
    }
    res.status(201).json(
        new ApiResponse(true, 201, {message: "All jobs retrieved successfully", totaljobs: jobs.length, jobs})
    )

})



// //////////// Update job controller //////////
// // This controller updates a specific job posting by its ID.

const updateJobController = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    console.log("Authenticated user from token:", req.user);

    const {company, position, workLocation, workType} = req.body;
    if(!company || !position || !workLocation || !workType){
        throw new ApiError(404, "Please provide all the fields");
    }

    
     if (!req.user || !req.user._id) {
    throw new ApiError(401, "User not authenticated");
  }

   const job = await jobsModel.findOne({_id: id, createdBy: req.user._id});
   console.log("Job found for update:", job);
   if(!job){
    throw new ApiError(404, `Job not found or you are not authorized to update this job ${id}`);
   }
   console.log("Authenticated user ID:", req.user._id);
   
      console.log("Job created by user ID:", job?.createdBy?.toString());
   if(!job.createdBy){
    throw new ApiError(404, "Job not found for the login user or you are not authorized to update this job");
   }
   
if(job.createdBy.toString() !== req.user._id.toString()){
   
     throw new ApiError(404, "You are not authorized to update this job");
}

const updateJob = await jobsModel.findOneAndUpdate({_id: id},

     req.body, {new : true, runValidators: true});

     //response
     res.status(201).json(
        new ApiResponse(true, 201, {message: "Job updated successfully", user: id, updateJob})
     );

})



//////////// Delete job controller //////////
// This controller deletes a specific job posting by its ID.

const deleteJobController = asyncHandler(async(req, res) => {
    const {id}  = req.params;

    const job = await jobsModel.findOne({_id: id, createdBy: req.user._id});
    if(!job){
        throw new ApiError(404, `Job not found or you are not authorized to delete this job ${id}`);
    }
    if(!job.createdBy){
        throw new ApiError(404, "Job not created by the login user or you are not authorized to delete this job");
    }
    if(job.createdBy.toString() !== req.user._id.toString()){
        throw new ApiError(404, "You are not authrorized to delete this job");
    }
    const deletedJob = await jobsModel.findOneAndDelete({_id: id, createdBy: req.user._id });
    if(!deletedJob){
        throw new ApiError(404, `Job not found for deletion or you are not authroized to delete this job ${id} `);
    }
    res.status(201).json(
        new ApiResponse( true, 201, {message: "Job deleted! successfully", job, deletedJob})
    )

})



////////////////////////   JOBS STATS FILTER CONTROLLER   ////////////////////////
// This controller retrieves job statistics based on various filters.
const getJobStatsController = asyncHandler(async(req, res) => {
    const stats = await jobsModel.aggregate([
        //serch by user jobs
        {
            $match:{
                createdBy: new mongoose.Types.ObjectId(req.user._id)
            },
           
        },
        {
            $group:{
                _id: "$status",
                count: {$sum:1}
            }
        }
    ])

    //DEFAULT STATS
    const defaultstats = {
        interview: stats.interview || 0,
        pending: stats.pending || 0,
        rejected: stats.rejected || 0,
    }
// Monthly stats of applications
    let monthlyApplications = await jobsModel.aggregate([
        {
            $match:{
                createdBy: new mongoose.Types.ObjectId(req.user._id)
            },
        },
        {
            $group:{
                _id: {
                    year: {$year: "$createdAt"},
                    month: {$month: "$createdAt"},
                },
                count: {$sum:1}
            },
        },
    ])


    /////////////// moment package ///////////////
    // This is used to format the date in a readable format.
    // Sort monthly applications by year and month through moment package
    monthlyApplications = monthlyApplications.map(item => {
        const {_id: {year, month}, count} = item;
        const date = moment().year(year).month(month -1).format("MMM - YYYY");
        return {date, count}
    }).reverse();



    // response
    res.status(200).json(
        new ApiResponse(true, 200, {totalJob: stats.length , message: "Job stats retrieved successfully", stats , stats: defaultstats, monthlyApplications})
    )

});


export { createJobController,
         getAllJobsController,
         updateJobController,
         deleteJobController,
         getJobStatsController
 }