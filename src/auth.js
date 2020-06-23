const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const { validateUserId } = require("./firebase");

const JWT_SECRET = process.env.JWT_SECRET || "SECRET" || require("uuid").v4();
const JWT_EXPIRATION_TIME_IN_SECONDS = 60 * 24 * 30;

const auth = expressJwt({ secret: JWT_SECRET });
auth.dev = (req, res, next) => {
  req.user = { userId: "FWYShWqidtgkKgGSHgFIfvWuD6r1" };
  next();
};

const createToken = (data) =>
  jwt.sign(data, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME_IN_SECONDS,
  });

module.exports = {
  auth,
  createToken,
  validateUserId,
};
