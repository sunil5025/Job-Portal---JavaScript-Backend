import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import userModel from '../models/userModel.js';



const userAuthentication = async(req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new ApiError(400, "Authorization Failed")
    }
    const token = authHeader.split(" ")[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // console.log("Payload from token:", payload);
        if(!payload){
            throw new ApiError(400, "Invalid Token")
        }

        //fetch user from database
        const user = await userModel.findById(payload.id);
        // console.log("User found from token:", user);
        if(!user){
            throw new ApiError(404, "User not found from token");
        }
        req.user = {
            _id: user._id,
            email: user.email,
            name: user.name
        }
        next();
    } catch (error) {
        throw new ApiError(400, "Auth Failed")
        
    }
}

export  {userAuthentication}