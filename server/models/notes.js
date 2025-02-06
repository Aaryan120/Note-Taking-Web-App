const mongoose = require("mongoose");


const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    noteImages:[{
        type:String,
        required:true,
    }],
    noteCreatedAt:{
        type:Date,
        default: Date.now,
    },
    updatedAt:{
        type:Date,
    },
    audioUrl:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    isFavorite:{
        type:Boolean,
    }
})



module.exports = mongoose.model("Note",noteSchema);