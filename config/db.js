import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DEV_URL);
        console.log(`MongoDB Database Connected: ${conn.connection.host}`.cyan.underline); 

    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold);
        // Ask rahul, why we are using process.exit(1) here
        process.exit(1); 
    }

};
export default connectDB;