
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const user = require("../models/user");
require("dotenv").config();



//reset password token
exports.resetPasswordToken = async(req,res) =>{
    try {
        //fetch the data from request body
        const {email} = req.body;

        //validate the user details
        if(!email){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        //check if user exists 
        const userDetails = await user.findOne({email : email});

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message: "No such user exists",
            });
        }
        //generate token
        const token = crypto.randomBytes(20).toString("hex");
        

        //update user model by adding token and expiration time
        const updateDetails = await user.findOneAndUpdate({email: email},
                                                            {
                                                                token:token,
                                                                resetPasswordExpires:Date.now()+5*60*1000,
                                                            },
                                                            {new:true}
        );

        //generate a frontend link for resetting password 
        //we are hosting our frontend on port 3000 and then we are assigning a token which will generate unique url 
        const url = `http://localhost:3000/reset-password/${token}`;
        //send mail containing the url
        await mailSender(email,
                    "Reset Password link",
                    `Your Link for email verification is ${url}. Please click this url to reset your password`
        );
        //return response
        return res.status(200).json({
            success:true,
            message:"Password reset Link sent successfully",
        })


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Reset password failed,Please try again",
        }); 
    }
}

//reset password

exports.resetPassword = async(req,res) =>{
    try {
        //fetch data from the body
        //The token will be added in the body from the frontend and from there we can fetch the token
        const {password,confirmPassword,token} = req.body;
        //validate the data
        if(!password || !confirmPassword){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        //match the password and hash the password
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password and confirm password do not match,please try again",
            });
        }
        
        //validate the token(we added the token to identify the user as we had no other method to identify the user)
        // using the token we will be fetching details of the user
        const validToken = await user.findOne({token:token});
        if(!validToken){
            return res.status(400).json({
                success:false,
                message:"Invalid token"
            });
        }
        //validate the expiry time
        const expiryTime = validToken?.resetPasswordExpires;
        if(Date.now() > expiryTime){
            return res.status(400).json({
                success:false,
                messag:"Link has expired,Please try again",
            });
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        //update the user database
        await user.findOneAndUpdate({token:token},
                                    {
                                        password: hashedPassword,
                                    },
                                    {new:true},
        )

        //return response
        return res.status(200).json({
            success:true,
            message:"Password reset successful",
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Some error occured while changing password,Please try again",
        })
    }
}