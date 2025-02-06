const OTP = require("../models/OTP");
const User = require("../models/user");
const otpgenerator = require("otp-generator")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
exports.sendOTP = async (req,res) =>{
    try {
        // fetch the data
        const {email} = req.body;

        // if(!email){
        //     return res.status(404).json({
        //         success:false,
        //         message:"All fields are mandatory",
        //     })
        // }

        // check if user alread exists
        const userExists = await User.findOne({email:email})

        if(userExists){
            return res.status(401).json({
                success:false,
                message:"User already exists",
            })
        }

        // if user does not exists create otp 
        var otp = otpgenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
            digits:true,
        });


        // check if the same otp does not exists in the user schema
        let otpExists = await OTP.findOne({otp:otp});

        while(otpExists){
            otp = otpgenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                digits:true,
                specialChars:false,
            })
            otpExists = await OTP.findOne({otp:otp});
        }

        // unique otp generated
        const otpPayload = {email,otp};
        // console.log(otpPayload);
        const otpBody = await OTP.create(otpPayload);


        // console.log(otp);
        res.status(200).json({
            success:true,
            message:"OTP Sent SuccessFully",
            otp,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"OTP sent failed,Please Try Again",
        })
    }
}


exports.signUp = async (req,res) =>{
    try {
        // fetch the data  from req body
        const {firstName,lastName,email,password,confirmPassword,otp} = req.body;
        // validate the data
        if(
            !firstName ||
            !lastName || 
            !email || 
            !password || 
            !confirmPassword ||
            !otp 
        ){
            return res.status(404).json({
                success:false,
                message:"All fields are mandatory",
            })
        }

        // validate if user already exists
        const userExists = await User.findOne({email:email});

        if(userExists){
            return res.status(401).json({
                success:false,
                message:"User already registered, Please Log In"
            })
        }

        // if user does not exist match password
        if(password !== confirmPassword){
            return res.status(405).json({
                success:false,
                message:"Password and Confirm Password do not match",
            })
        }
        //verify otp ( from most recent otp stored for user)
        //sorting on the basis of createdAt and -1 is for sorting in descending order and limit(1) limits the results to only one document.
        const recentOTP = await OTP.find({email: email}).sort({expiryAt:-1}).limit(1);

        if(recentOTP.length === 0){
            return res.status(400).json({
                success:false,
                message:"OTP is not valid"
            })
        }
        if(recentOTP[0].otp !== otp){
            return res.status(400).json({
                success:false,
                message:"invalid OTP",
            });
        }

        // if password matches then hash and store in database
        const hashedPassword = await bcrypt.hash(password,10);

        const userDetails = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            imageUrl:''
        })


        return res.status(200).json({
            success:true,
            message:"User registered successfully",
            data:userDetails,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while signing up,Please Try Again"
        })
    }
}

//login handler
exports.login = async(req,res) => {
    try {
        //fetch data from req body
        const {email,password} = req.body;
        //validate data
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Fill all the fields carefully"
            });
        };
        //check if user exists or not
        const user = await User.findOne({email:email}).populate("notes")

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not Registered, Please Sign-Up To Continue"
            });
        }

        //match passwords from DB and generate token and create cookie
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email: user.email,
                id: user._id,
            };

            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h",
            })
            user.token = token;
            user.password = undefined;

            return res.status(200).json({
                success:true,
                token,
                user,
                message:"Logged in Successfully"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect",
            })
        } 
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failed. Please try again later"
        })
    }
}