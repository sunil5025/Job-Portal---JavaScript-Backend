
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/apiResponse.js";
import userModel from "../models/userModel.js"



const registerController = async(req, res) => {
    const {name, lastName, email, password} = req.body

// validate
if(!name){
    throw new ApiError(400, "Please provide the name")
}
if(!lastName){
    throw new ApiError(400, "Please Provide the last name as well as")
}
if(!email){
    throw new ApiError(400, "Email required")
}
if(!password){
    throw new ApiError(400, "Password is must to fill")
}


//exiting user check
const exitingUser = await userModel.findOne({email})
if(exitingUser){
    throw new ApiError(400, "User email already exists")
}
// console.log(req.body);


// user create method
const user = await userModel.create({name, lastName, email, password})
if(!user){
    throw new ApiError(400, "User is not create")
}
return res.status(200).json(
    new ApiResponse(true, 200, "User created Successfully")
)


}



export {registerController}