import mongoose from  "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async()=>{
    try {
       const connectionInstance =  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       console.log(`MongoDB connection HOST::${(await connectionInstance).connection.host}`);
    } catch (error) {
        throw new Error(error);
    }
};