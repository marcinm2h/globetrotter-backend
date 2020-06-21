const express = require("express");
const bodyParser = require("body-parser");
const { router } = require("./router");
const { errorHandler } = require("./auth");

const logger = () => (req, res, next) => {
  console.log(`REQUEST ${req.path} (${req.method})`, [
    req.user || "NOT_LOGGED_IN",
  ]);
  next();
};

const PORT = process.env.PORT || 8080;

const app = express();


app.use(bodyParser.json());
app.use(logger());
app.use(router);
app.use(errorHandler());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
