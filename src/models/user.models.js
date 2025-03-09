import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide username"],
        unique:[true,"Username already exist. Please choose another name ..."],
    },
    email:{
        type:String,
        required:[true,"Please provide an email"],
        unique:[true,"Email already exist. Please provide another email ..."],
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
        // select:false, // this will not show the password in the response
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
})

const User = mongoose.models.users || mongoose.model("users",userSchema);

export default User;