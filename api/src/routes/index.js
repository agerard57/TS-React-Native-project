const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

module.exports = function routes(app) {
  // /////////////////////////
  // Middlewares instantiated
  app.use(cors());
  app.use(morgan("tiny"));
  app.use(express.json({ extended: true, limit: "5mb" }));

  // ///////
  // Routes
  require("./todos.routes")(app);
};
