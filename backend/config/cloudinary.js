import { v2 as cloudinary } from 'cloudinary'

const connectCloudinary = async () => {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    console.log("Cloudinary Config Status:", {
        cloud_name: cloudName || "MISSING",
        api_key: apiKey ? "PRESENT" : "MISSING",
        api_secret: apiSecret ? "PRESENT" : "MISSING"
    });

    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret
    });
}

export default connectCloudinary;