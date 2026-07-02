import mongoose from "mongoose";



const productDetail = new mongoose.Schema({
    images: {
        type: [String], // Array of strings to store image URLs
        default: [] // Default to an empty array if no images are provided
    },

    ProductName: {
        required: true,
        type: String
    },
    ProductDescription: {
        required: true,
        type: String
    },
    ProductCategory: {
        required: true,
        type: String
    },
    SubCategor: {
        required: true,
        type: String
    },
    ProductPrice: {
        required: true,
        type: Number
    },
    ProductSizes: {
        required: true,
        type: Array
    },
    bestseller: {
        type: Boolean,
        default: false
    },
    date: {
        type: Number,
        default: Date.now,
        required: true
    }
},{collection:"productdetail"});

const productDetailmodel = mongoose.models.productDetailmodel || mongoose.model("productDetailmodel", productDetail);

export default productDetailmodel;