require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const careerRoutes = require('./routes/careerRoutes');
const jobOpenings = require("./data/jobs"); //Import Jobs

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("🔥 MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Basic Route
app.get("/", (req, res) => {
  res.send("Backend is running! 🚀");
});
// Use the career routes
app.use('/careers', careerRoutes);
//Fetch Jobs
app.get("/api/jobs", (req, res) => {
  res.json(jobOpenings);
});

// Start Server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
