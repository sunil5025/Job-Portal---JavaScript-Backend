import mongoose, { Schema } from "mongoose";
import validator from 'validator';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



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


// middelware bcryptjs for password encrypt
userSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


//compare Password function
userSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch;

}


//JSON WEBTOKEN
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            name:this.name,
            password: this.password
        }, process.env.JWT_SECRET, {expiresIn: '1d'});
};




export default mongoose.model('User', userSchema)