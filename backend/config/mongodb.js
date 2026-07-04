import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("DB connected successfully");
        });
        mongoose.connection.on('error', (err) => {
            console.error("MongoDB connection error:", err);
        });
        await mongoose.connect(`${process.env.MONGODB_URL}`);
    } catch (error) {
        console.error("Failed to connect to Database:", error.message);
        process.exit(1);
    }
}

export default connectDB;