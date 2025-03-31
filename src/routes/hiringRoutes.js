const express = require("express");
const { submitHiringRequest } = require("../controllers/hiringController");

const router = express.Router();
router.post("/", submitHiringRequest);

module.exports = router;
