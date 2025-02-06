const notes = require("../models/notes");
const user = require("../models/user");
const uploadFilesToCloudinary = require("../utils/fileUploader");
const mongoose = require('mongoose')

exports.createNotes = async (req,res) =>{
    try {
        // fetch the details
        console.log("CALLING CREATE NOTES WITH BODY: ",req.body);
        console.log("PRINTING REQ FILES: ",req.files);
        const userId = req.user.id;
        const {title,description,isFavorite = false} = req.body;
        
        if(!userId){
            return res.status(404).json({
                success:false,
                message:"User is not logged in"
            })
        }
        // validate the data
        if(
            !title ||
            !description
        ){
            return res.status(404).json({
                success:false,
                message:"Note Title and Description are required",
            })
        }

        // upload images
        let imageUrls = [];
        if(req.files && req.files.imageFile){
            const images = Array.isArray(req.files.imageFile) ? req.files.imageFile : [req.files.imageFile];
            for(const image of images){
                const result = await uploadFilesToCloudinary(image,process.env.FOLDER_NAME);
                imageUrls.push(result.secure_url)
            }
        }
        let audioUrl = ''
        if(req.files && req.files.audio){
            const audioData = Array.isArray(req.files.audio) ? req.files.audio[0] : req.files.audio;
            const result = await uploadFilesToCloudinary(audioData,process.env.FOLDER_NAME);
            audioUrl = result.secure_url;
        }
        console.log("PRINTING IMAGE URLS",imageUrls);
        // validated then create note
        const note = await notes.create({
            title,
            description,
            updatedAt:Date.now(),
            isFavorite,
            noteImages:imageUrls,
            user:userId,
            audioUrl:audioUrl,
        })

        const userDetails = await user.findByIdAndUpdate(
            {_id : userId},
            {
                $push:{
                    notes:note._id,
                }
            },
            {new:true}
        )
        console.log("PRINTING USER DETAILS: ",userDetails);
        return res.status(200).json({
            success:true,
            message:"Note Created Successfully",
            data:note,
        })
    } catch (error) {
        console.log("ERROR IN CREATE NOTES",error);
        return res.status(500).json({
            success:false,
            message:"Error while creating note,Please Try Again",
        })
    }
}


exports.updateNotes = async (req,res) =>{
    try {
        console.log(req.body);
        const userId = req.user.id;
        const {noteId} = req.body;
        const updates = req.body;

        const noteDetails = await notes.findById(noteId);

        if(!noteDetails){
            return res.status(404).json({
                success:false,
                message:"Note not Found",
            })
        }

        if (req.files && req.files.imageFile) {
            let imageUrls = noteDetails.noteImages ? [...noteDetails.noteImages] : [];
            const images = Array.isArray(req.files.imageFile) ? req.files.imageFile : [req.files.imageFile];
            for (const image of images) {
              const result = await uploadFilesToCloudinary(image, process.env.FOLDER_NAME);
              imageUrls.push(result.secure_url);
            }
            noteDetails.noteImages = imageUrls;
          }
        if (req.files && req.files.audioFile) {
            const audioData = Array.isArray(req.files.audioFile) ? req.files.audioFile[0] : req.files.audioFile;
            const result = await uploadFilesToCloudinary(audioData, process.env.FOLDER_NAME);
            noteDetails.audioUrl = result.secure_url;
        }
        for(const key in updates){
            console.log("UPDATING KEY",key);
            if(updates.hasOwnProperty(key) && key !== 'noteId'){
                noteDetails[key] = updates[key];
            }
        }

        await noteDetails.save()

        console.log("PRINTING NOTEDETAILS",noteDetails)
        const updatedNotes = await notes.findById({
            _id:noteId,
        })
        .populate("user")

        console.log("PRINTING UPDATED NOTES INSIDE UPDATE NOTE: ",updatedNotes);
        return res.status(200).json({
            success:true,
            messsage:"Notes Updated Successfully",
            data:updatedNotes,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while Updating notes,please try again"
        })
    }
}


exports.deleteNotes = async (req,res) =>{
    try {
        const userId = req.user.id;
        const {noteId} = req.body;
        // validate note id
        if (!noteId || !mongoose.Types.ObjectId.isValid(noteId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing note ID",
            });
        }
        console.log("PRINTING NOTE ID",noteId);
        // delete note
        await notes.findByIdAndDelete(noteId);
        console.log("DELETING FROM USER DETAILS",noteId);
        const userDetails = await user.findByIdAndUpdate(userId,
            {
                $pull:{
                    notes: noteId,
                }
            },
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"Note deleted successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while deleting note",
        })
    }
}

// get user notes
exports.getUserNote = async (req,res) =>{
    try {
        const userId = req.user.id;
        // validate user id
        if(!userId){
            return res.status(404).json({
                success:false,
                message:"User not Found",
            })
        }

        // get user note
        const userNotes = await user.findById(userId).populate({
            path:"notes"
        });

        return res.status(200).json({
            success:true,
            message:"User notes fetched Successfully",
            data:userNotes,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error getting user notes"
        })
    }
}