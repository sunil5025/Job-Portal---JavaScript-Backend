import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jobsModel from "../models/jobsModel.js";
import { asyncHandler } from "../utils/async_Handler.js";




const createJobController = asyncHandler(async(req, res) => {

    const { company, position, workLocation, workType} = req.body
    // console.log("Request body for create job:", req.body);

    if(!company || !position || !workLocation || !workType){
        // console.log("Missing fields in request body");
        throw new ApiError(404, "Please provide all the fields");
    }

    // const userId = req.user._id;
    // console.log("Authenticated user ID:", userId);
    req.body.createdBy = req.user.userId;
    
    const job = await jobsModel.create(req.body);
    // console.log("Job created:", job);
    res.status(201).json(
        new ApiResponse(true, 201, {message: "Job created successfully", job})
    )


});





export { createJobController }