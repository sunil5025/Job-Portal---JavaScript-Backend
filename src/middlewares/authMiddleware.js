import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';


const userAuthentication = async(req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new ApiError(400, "Authorization Failed")
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {id: payload._id}
        next();
    } catch (error) {
        throw new ApiError(400, "Auth Failed")
        
    }
}

export  {userAuthentication}