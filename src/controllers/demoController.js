const Demo = require("../models/Demo");

exports.scheduleDemo = async (req, res) => {
    try {
        const demoRequest = new Demo(req.body);
        await demoRequest.save();
        res.json({ success: true, message: "Demo session scheduled successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
