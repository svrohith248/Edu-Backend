const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  resume: { type: String },  // This will store the file URL from Cloudinary
  coverLetter: { type: String }
});

const Career = mongoose.model('Career', careerSchema);
module.exports = Career;
