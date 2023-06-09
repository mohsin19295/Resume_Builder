require('dotenv').config()
const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const PORT = 8082;

// mongoose connection
mongoose.connect(process.env.MONGO_URI);


// Creating a Schema for Resume data
const resumeDataSchema = new mongoose.Schema({
  summary: String,
  fullName: String,
  position: String,
  city: String,
  email: String,
  number: Number,
  github: String,
  linkedin: String,
  qualification: String,
  universityName: String,
  qualificationCity: String,
  passoutYear: Number,
  companyName: String,
  fromDate: String,
  toDate: String,
  skills: String,
  softSkills: String,
  interest: String,
  image: String,
});

// Creating a model for Resume data
const ResumeData = new mongoose.model("resumeData", resumeDataSchema);

// Creating multer storage configration
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage });

// Serving static files from public directory
app.use(express.static("public"));

// Serving the uploaded images from the uploads directory
app.use("/uploads", express.static("uploads"));

// Handeling form data
app.post("/submit-form", upload.single("image"), (req, res) => {
  const {
    summary,
    fullName,
    position,
    city,
    email,
    number,
    github,
    linkedin,
    qualification,
    universityName,
    qualificationCity,
    passoutYear,
    companyName,
    fromDate,
    toDate,
    skills,
    softSkills,
    interest,
  } = req.body;

  // Checking if the image file exists
  if (!req.file || !req.file.filename) {
    return res.status(400).json({ error: "Image file is missing or invalid" });
  }

  // If the image file exists
  const image = req.file;

  // creating a new resume data document
  const resumeData = new ResumeData({
    summary,
    fullName,
    position,
    city,
    email,
    number,
    github,
    linkedin,
    qualification,
    universityName,
    qualificationCity,
    passoutYear,
    companyName,
    fromDate,
    toDate,
    skills,
    softSkills,
    interest,
    image: image.filename,
  });

  resumeData
    .save()
    .then(() => res.json({ status: true }))
    .catch((err) => {
      console.log(err);
      res.json({ status: false });
    });
});

app.get("/resume-data", (req, res) => {
  ResumeData.find()
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.json([]);
    });
});

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
