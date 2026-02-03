const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Telegram Joke Bot is running");
});

module.exports = app;
