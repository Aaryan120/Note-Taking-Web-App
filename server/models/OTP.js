const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/template/otpTemplate");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    expiryAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
})


async function sendVerificationEmail(email,otp){
    try {
        // console.log("PRINTING EMAIL INSIDE SEND VERIFICATION MAIL",email);
        const mailResponse = await mailSender(
            email,
            "OTP Verfication Mail From Tars Note Taking App",
            otpTemplate(otp)
        )
        console.log(mailResponse);
    } catch (error) {
        console.log("Error sending mail verification,Please Try again",error);
        throw(error)
    }
}

otpSchema.pre("save",async function(next){
    // console.log("PRINTING EMAIL AND OTP",email,otp);
    await sendVerificationEmail(this.email,this.otp);
    next();
});

module.exports = mongoose.model("OTP",otpSchema);