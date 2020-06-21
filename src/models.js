const pick = require("lodash/pick");
const uuidv4 = require("uuid").v4;

const uuid = () => uuidv4().substr(0, 8);

const Place = {};
Place.create = ({
  ownerId,
  title = "",
  description = "",
  radius = 1,
  photo = null,
} = {}) => ({
  id: uuid(),
  ownerId,
  title,
  description: description.substring(0, 300),
  radius,
  photo,
});
const allowedKeys = Object.keys(Place.create({}));
Place.parseArgs = (args) => pick(args, allowedKeys);

module.exports = { Place };
