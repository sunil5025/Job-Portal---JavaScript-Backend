import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected successfully: ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`Error in Database connection: ${error.message}`);
    }
}


export default connectDB;