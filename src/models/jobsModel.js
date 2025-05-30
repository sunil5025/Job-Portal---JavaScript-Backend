import mongoose from "mongoose";


const jobSchema = new mongoose.Schema({

    company:{
        type: String,
        required: [true, " Please provide company name"],
        maxlength: 50,
    },
    position:{
        type: String,
        required: [true, "Please provide position"],
        maxlength: 100
    },
    status:{
        type: String,
        enum:["interview", "pending", "rejected"],
        default: "pending"
    },
    workLocation:{
        type: String,
        required: [true, "Please provide work location"],
        default: "Bangalore"
    },
    workType:{
        type:String,
        enum:["Full-Time", "Part-Time", "Remote", "Internship"],
        default: "Full-Time"
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },

}, {timestamps: true});

const Job = mongoose.model("Job", jobSchema);
export default Job;
console.log("Job model is created successfully");