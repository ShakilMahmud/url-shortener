const { nanoid } = require("nanoid");
const { saveUrl, getUrl } = require("../models/urlDatabase");
const { isValidUrl } = require("../utils/validators");

const SHORT_URL_LENGTH = 6;

const generateShortUrl = (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl || !isValidUrl(longUrl)) {
    return res.status(400).json({ error: "Invalid URL provided!" });
  }

  let shortUrl;
  const MAX_RETRIES = 5; // avoid infinite loops

  for (let i = 0; i < MAX_RETRIES; i++) {
    shortUrl = nanoid(SHORT_URL_LENGTH);
    if (!getUrl(shortUrl)) break;

    if (i === MAX_RETRIES - 1) {
      return res
        .status(500)
        .json({ error: "Failed to generate unique short URL" });
    }
  }
  saveUrl(shortUrl, longUrl);

  res.status(200).json({ status: "success", data: { shortUrl, longUrl } });
};

const redirectShortUrl = (req, res) => {
  const { shortUrl } = req.params;

  const longUrl = getUrl(shortUrl);
  if (!longUrl) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.redirect(302, longUrl);
};

module.exports = { generateShortUrl, redirectShortUrl };
