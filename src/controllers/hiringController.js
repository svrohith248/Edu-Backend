const Hiring = require("../models/Hiring");

exports.submitHiringRequest = async (req, res) => {
    try {
        const hiringRequest = new Hiring(req.body);
        await hiringRequest.save();
        res.json({ success: true, message: "Hiring request submitted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
