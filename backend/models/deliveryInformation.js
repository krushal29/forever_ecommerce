import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
    UserId: {
        type: String, required: true
    },
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Street: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    ZipCode: {
        type: Number,
        required: true
    },
    Country: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true
    },
    bill: {
        type: Number
    },
    paymentMethod: {
        type: String
    },
    payment:{
        type:Boolean,
        default:false
    },
    cartDetail: {
        type: Array
    }
}, { collection: "deliveryDetail", timestamps: true })

const deliveryDetailModel = mongoose.models.deliveryDetailModel || mongoose.model("deliveryDetailModel", deliverySchema);

export default deliveryDetailModel;