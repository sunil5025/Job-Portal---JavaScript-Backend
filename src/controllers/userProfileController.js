import userModel from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/async_Handler.js";

const updateUserProfiles = asyncHandler (async (req, res, next) => {
    // console.log("Authenticated user:", req.user?._id);


    const {name, email, lastName, phoneNumber, location} = req.body;
    // console.log("Request body for update user profile:", req.body);

    if(!name || !email || !phoneNumber || !location || !lastName){
        throw new ApiError(404, "All fields are required");
    }

    const userId = req.user._id;
    const user = await userModel.findById(userId)
    // console.log("User found for update:", user);
    if(!user){
        throw new ApiError(404, "User not found");
    }
    user.name = name;
    user.email = email;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
    user.location = location;

    await user.save();
 
    const token = user.generateAccessToken();
    res.status(201).json(
        new ApiResponse(true, 201, {message:"User Profile updated Successfully", user, token})
    )
});



export { updateUserProfiles };