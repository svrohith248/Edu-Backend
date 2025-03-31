const Career = require("../models/Career");
const cloudinary = require("../config/cloudinary");

exports.applyCareer = async (req, res) => {
    try {
        const { fullName, email, phone, position, message } = req.body;
        const result = await cloudinary.uploader.upload(req.file.path);
        const career = new Career({ fullName, email, phone, position, resumeUrl: result.secure_url, message });
        await career.save();
        res.json({ success: true, message: "Application submitted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
