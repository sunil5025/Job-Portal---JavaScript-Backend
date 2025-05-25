import mongoose, { Schema } from "mongoose";
import validator from 'validator';

//Schema

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    lastName:{
        type:String,
        required: true

    },
    email:{
        type:String,
        required: true,
        unique: true,
        validate: validator.isEmail
    },
    age:{
        type: Number
    },
    phoneNumber:{
        type:Number
    },
    password:{
        type:String,
        required:true,
        minlength: [6, "Password length should be more than 6 character"]
    },
    location:{
        type:String,
        default: "INDIA"
    }



},{timestamps: true});


export default mongoose.model('User', userSchema)