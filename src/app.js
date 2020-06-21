const express = require("express");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const { router } = require("./router");
const { errorHandler } = require("./auth");
const { validateUserId } = require("./firebase");

const logger = () => (req, res, next) => {
  console.log(`REQUEST ${req.path} (${req.method})`, [
    req.user || "NOT_LOGGED_IN",
  ]);
  next();
};

const PORT = process.env.PORT || 8080;
const DB_FILE_PATH = process.env.DB_FILE_PATH || "db.json";

const app = express();

low(new FileAsync(DB_FILE_PATH)).then((db) => {
  app.use(bodyParser.json());
  app.use(logger());
  app.use(router(db));
  app.use(errorHandler());

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
