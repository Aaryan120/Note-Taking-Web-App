const express = require("express");
const router = express.Router();

const {
    createNotes,
    deleteNotes,
    getUserNote,
    updateNotes
} = require("../controllers/NotesController")

// Auth middle ware
const {auth} = require("../middlewares/auth");
// DEFINING ROUTES

router.post("/createnote",auth,createNotes);
router.post("/updatenote",auth,updateNotes);
router.post("/deletenote",auth,deleteNotes);
router.get("/getusernote",auth,getUserNote);

module.exports = router;