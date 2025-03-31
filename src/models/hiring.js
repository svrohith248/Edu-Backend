const mongoose = require("mongoose");

const HiringSchema = new mongoose.Schema({
    companyName: String,
    contactPerson: String,
    email: String,
    phone: String,
    positions: String,
    skills: String,
    additional: String
});

module.exports = mongoose.model("Hiring", HiringSchema);
