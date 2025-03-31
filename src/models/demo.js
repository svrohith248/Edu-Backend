const mongoose = require("mongoose");

const DemoSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    course: String,
    mode: String,
    additional: String
});

module.exports = mongoose.model("Demo", DemoSchema);
