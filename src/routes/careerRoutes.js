// routes/careerRoutes.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary'); // Cloudinary config
const Career = require('../models/career');
const streamifier = require('streamifier'); // Required for handling buffer streams

const router = express.Router();

// Multer Storage (memory storage for simplicity)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'application/msword') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOC files are allowed'), false);
    }
  },
});

// Cloudinary Upload as a Promise
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// Career form submission route (POST with file upload)
router.post('/', upload.single('resume'), async (req, res) => {
  try {

    console.log("Incoming Request Body:", req.body);
    console.log("Incoming File:", req.file);
    const { fullName, email, phone, position } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Resume file is required!' });
    }

    // Upload resume to Cloudinary
    const resumeUrl = await uploadToCloudinary(req.file.buffer);

    // Save to MongoDB
    const newCareer = new Career({
      fullName,
      email,
      phone,
      position,
      resume: resumeUrl, // Store Cloudinary file URL
    });

    await newCareer.save();
    res.status(200).json({ message: 'Career application submitted successfully!', resumeUrl });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit the application.' });
  }
});

module.exports = router;
