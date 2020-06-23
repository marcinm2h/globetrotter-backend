const { Router } = require("express");
const { auth, createToken, validateUserId } = require("./auth");
const { Place } = require("./models");
const MESSAGES = require("./messages.json");

const router = (db) => {
  const router = Router();

  router.post("/login", (req, res, next) => {
    const userId = req.body.userId;
    if (!userId) {
      throw new Error(MESSAGES.ERRORS.DEFAULT);
    }
    validateUserId(req.body.userId).then((isValid) => {
      if (!isValid) {
        return next(new Error(MESSAGES.ERRORS.DEFAULT));
      }

      const user = {
        userId: req.body.userId,
      };
      const token = createToken(user);

      // FIXME: token in header
      res.send({
        data: {
          token,
        },
      });
    });
  });

  router.get("/places", auth, (req, res) => {
    const userId = req.user.userId;
    const places = db
      .get("places")
      .filter(({ ownerId }) => ownerId === userId)
      .value();

    res.send({
      data: {
        places,
      },
    });
  });

  router.get("/places/:placeId", auth, (req, res) => {
    const place =
      db
        .get("places")
        .find(({ id }) => id === req.params.placeId)
        .value() || null;

    res.send({
      data: {
        place,
      },
    });
  });

  router.delete("/places/:placeId", auth, (req, res) => {
    db.get("places")
      .filter((place) => place.ownerId === req.user.userId)
      .remove(({ id }) => id === req.params.placeId)
      .write()
      .then((place) => {
        res.send({
          data: {
            place,
          },
        });
      });
  });

  router.put("/places/:placeId", auth, (req, res) => {
    db.get("places")
      .filter((place) => place.ownerId === req.user.userId)
      .filter((place) => place.id === req.params.placeId)
      .assign(Place.parseArgs(req.body))
      .write()
      .then((place) => {
        res.send({
          data: {
            place,
          },
        });
      });
  });

  router.post("/places", auth, (req, res) => {
    db.get("places")
      .push(Place.create({ ownerId: req.user.userId, ...req.body }))
      .write()
      .then((places) => {
        res.send({
          data: {
            place: places[places.length - 1],
          },
        });
      });
  });

  return router;
};

module.exports = { router };
