import mongoose from "mongoose";
import config from "./config/config.js";

const connectDB = async () => {
    try {

        console.log(config.mongodbURI)
        mongoose.set('strictQuery', false); // Optional, prevents MongoDB warnings
        const connection = await mongoose.connect(config.mongodbURI); // No extra options needed

        console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
    }
};

export default connectDB;
