const { Router } = require("express");
const { auth, createToken } = require("./auth");

const router = Router();

router.get("/", (req, res) => {
  res.send({
    status: 200,
    data: {
      message: "Api root",
    },
  });
});

router.post("/login", (req, res) => {
  const user = {
    login: "marcin",
  };
  const token = createToken(user);

  res.send({
    status: 200,
    data: {
      token,
    },
  });
});

router.get("/secure", auth, (req, res) => {
  console.log("/secure");
  res.send({
    status: 200,
    data: {
      ...req.user,
      message: "secure",
    },
  });
});

module.exports = { router };
