const express = require("express");
const https = require('https');
const fs = require('fs');
const user = require("./routes/user.js");
const scoreboard = require("./routes/scoreboard.js")
const InitiateMongoServer = require("./config/db.js");

var key = fs.readFileSync('mirrorme.key');
var cert = fs.readFileSync('mirrorme.crt');
var options = {
	key: key,
	cert: cert
};

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

var server = https.createServer(options, app);

server.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});