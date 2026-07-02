import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary=async ()=>{
    cloudinary.config({
        cloud_name:process.env.Cloud_name,
        api_key:process.env.cloudinary_api_key,
        api_secret:process.env.api_Secret
    })

}

export default connectCloudinary;