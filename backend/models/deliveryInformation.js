import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
    UserId: {
        type: String, require: true
    },
    FirstName: {
        type: String,
        require: true
    },
    LastName: {
        type: String,
        require: true
    },
    Email: {
        type: String,
        require: true
    },
    Street: {
        type: String,
        require: true
    },
    City: {
        type: String,
        require: true
    },
    State: {
        type: String,
        require: true
    },
    ZipCode: {
        type: Number,
        require: true
    },
    Country: {
        type: String,
        require: true
    },
    Phone: {
        type: Number,
        require: true
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
        type: Array,
        trackOrder1:"Order Placed"

    }
}, { collection: "deliveryDetail" })

const deliveryDetailModel = mongoose.models.deliveryDetailModel || mongoose.model("deliveryDetailModel", deliverySchema);

export default deliveryDetailModel;