const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
    },
    lastName: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    notes: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Note",
    }],
    otp: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"OTP",
    },
    token: {
        type:String,
    },
    resetPasswordExpires: {
        type:Date,
    },
    // additional details section to be added
})


module.exports = mongoose.model("user",userSchema);