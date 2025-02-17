const jwt = require("jsonwebtoken")
require("dotenv").config();
const user = require("../models/user")



exports.auth = async (req,res,next) =>{
    try {
        const token = req.body.token || req.header("Authorization").replace("Bearer ","");

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            })
        }

        // verify the token
        try {
            const decode = await jwt.verify(token,process.env.JWT_SECRET);

            req.user = decode;
        } catch (error) {
            console.log("PRINTING TOKEN:",token);
            console.log(error);
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while validating the token",
        })
    }
}
