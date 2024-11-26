const express = require("express");
const {
  generateShortUrl,
  redirectShortUrl,
} = require("../controllers/urlController");

const router = express.Router();

router.post("/generate", generateShortUrl);
router.get("/:shortUrl", redirectShortUrl);

module.exports = router;
