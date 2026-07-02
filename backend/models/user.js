import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
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
    },
    IsLogin:{
        type:Boolean,
        default:false
    }
},{minimize:false,collection:"userDetail"})

const userModel=mongoose.models.userModel||mongoose.model("userDetail",userSchema);

export default userModel;