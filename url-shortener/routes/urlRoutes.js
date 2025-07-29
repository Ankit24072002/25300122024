const express = require("express");
const { createShortUrl, redirectUrl, getStats } = require("../controllers/urlController");
const router = express.Router();

router.post("/shorturls", createShortUrl);
router.get("/shorturls/:code", getStats);
router.get("/:code", redirectUrl);

module.exports = router;
