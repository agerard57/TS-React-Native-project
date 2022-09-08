// Load the Required Modules
const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");

const getRoutes = require("./src/routes");

const app = express();

// Load the dotEnv lib and env vars declaration
dotEnv.config();

// Controllers or Routes
getRoutes(app);

// MongoDB Promise
const db = require("./src/config/db.config");
const consoleMessage = require("./src/utils/consoleMessage");
const server = mongoose.connect(
  `mongodb+srv://${db.USER}:${db.PWD}@${db.DBNAME}.mongodb.net/${db.TABLE}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Setup server to start listening
const portConfig = require("./src/config/port.config");
server.then(() => {
  app.listen(portConfig, consoleMessage(portConfig));
});

// Error checker for mongoose
const co = mongoose.connection;
co.on("error", console.error.bind(console, "MongoDB connection error:"));
