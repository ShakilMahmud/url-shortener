const urlDataStructure = {};

const saveUrl = (shortUrl, longUrl) => {
  urlDataStructure[shortUrl] = longUrl;
};

const getUrl = (shortUrl) => urlDataStructure[shortUrl];

module.exports = { saveUrl, getUrl };
