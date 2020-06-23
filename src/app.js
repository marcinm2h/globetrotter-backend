const express = require("express");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const MESSAGES = require("./messages.json");
const { router } = require("./router");

const errorHandler = () => (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).send({
      error: MESSAGES.ERRORS.UNAUTHORIZED,
    });
  }
  console.log(err);
  res.status(400).send({
    error: err.message,
  });
};

const logger = () => (req, res, next) => {
  console.log(
    `REQUEST ${req.path} (${req.method}) ${JSON.stringify(
      { body: req.body, params: req.params },
      null,
      2
    )}`,
    req.get("Authorization")
  );
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
