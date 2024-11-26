const express = require("express");
const bodyParser = require("body-parser");
const urlRoutes = require("./routes/urlRoutes");

const app = express();

app.use(bodyParser.json());
app.use(urlRoutes);

module.exports = app;
