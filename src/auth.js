const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid").v1;
const MESSAGES = require("./messages.json");

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRATION_TIME_IN_SECONDS = 60 * 1;

const auth = expressJwt({ secret: JWT_SECRET });

const errorHandler = () => (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.send({
      status: 401,
      error: MESSAGES.ERRORS.UNAUTHORIZED,
    });
  }
};

const createToken = (data) => jwt.sign(data, JWT_SECRET, {
  expiresIn: JWT_EXPIRATION_TIME_IN_SECONDS,
});

module.exports = {
  auth,
  errorHandler,
  createToken,
};
