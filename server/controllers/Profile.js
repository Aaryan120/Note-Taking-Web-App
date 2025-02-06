const User = require("../models/user")

exports.getUserDetails = async (req,res) =>{
    try {
        const userId = req.user.id;

        // validate the id
        if(!userId){
            return res.status(404).json({
                success:false,
                message:"user id not found",
            })
        }

        // get all the user data
        const userDetails = await User.findById(userId).populate("Notes");

        return res.status(200).json({
            success:true,
            message:"User Details Found",
            data:userDetails,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error,Could not get user details"
        })
    }
}