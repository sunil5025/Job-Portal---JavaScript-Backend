
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/apiResponse.js";
import userModel from "../models/userModel.js";
import { asyncHandler } from "../utils/async_Handler.js";




//register
const registerController = asyncHandler(async(req, res, next)  => {
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
const user = new userModel({
    name,
    lastName,
    email,
    password
});
await user.save();
// user.password = undefined; // to not send password in response
if(!user){
    throw new ApiError(400, "User is not create")
}

// already hashed password importing from userModel.js


const token = user.generateAccessToken();

return res.status(201).json(
    new ApiResponse(true, 201, {message: "User Registered (Created) Successfully", user,  token})
)
// console.log(token);

});


// login 
const loginController = async(req, res) => {
    const {email, password} = req.body;
    if(!email && !password){
        throw new ApiError(400, "Please enter the Email and Password in given Fields ");
    }
    const user = await userModel.findOne({email})
    if(!user){
        throw new ApiError(400, "Invalid email or password")
    }
    //compare Password
    const misMatch = await user.comparePassword(password)
    if(!misMatch){
        throw new ApiError(400, "Invalid email and password")
    }
    const token = user.generateAccessToken();
    res.status(201).json(
        new ApiResponse(true, 201, {message: "Login Successfully",  user, token, })
    )

}


//logout




export {
    registerController,
    loginController
    
}