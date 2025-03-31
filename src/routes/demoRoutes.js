const express = require("express");
const { scheduleDemo } = require("../controllers/demoController");

const router = express.Router();
router.post("/", scheduleDemo);

module.exports = router;
