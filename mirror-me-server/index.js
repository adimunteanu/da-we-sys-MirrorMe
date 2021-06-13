const express = require("express");
const user = require("./routes/user.js");
const scoreboard = require("./routes/scoreboard.js")
const InitiateMongoServer = require("./config/db.js");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);
app.use("/scoreboard", scoreboard);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
