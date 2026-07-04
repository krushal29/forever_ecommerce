import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    cartData:{
        type:Array,
        default:[]
    },
    IsAdmin:{
        type:String,
        default:"user"
    }
},{minimize:false,collection:"userDetail",timestamps:true})

const userModel=mongoose.models.userModel||mongoose.model("userDetail",userSchema);

export default userModel;