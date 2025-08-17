const express = require("express");
const app = express();
require("dotenv").config();

const userRoutes = require("./routes/User");
const noteRoutes = require("./routes/Notes");
const profileRoutes = require("./routes/Profile")

const database = require("./config/database");
database.dbConnect();

const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary")
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(
    cors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                "http://localhost:3001",
                "https://note-taking-web-app-delta.vercel.app",
                "https://note-taking-web-app-raj-aryans-projects-9e1bf71a.vercel.app",
                "https://note-taking-web-app-git-main-raj-aryans-projects-9e1bf71a.vercel.app"
            ];
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials:true,
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:'/tmp',
    })
)

cloudinaryConnect();

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/notes",noteRoutes);
app.use("/api/v1/profile",profileRoutes);4

app.get("/",(req,res) =>{
    return res.status(200).json({
        success:true,
        message:"Your server is up and running",
    })
})

app.listen(PORT,() =>{
    console.log(`App is running at ${PORT}`);
})