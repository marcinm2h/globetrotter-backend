const firebaseAdmin = require("firebase-admin");

const firebaseAdminApp = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(),
  databaseURL: "https://prm02-ac0cf.firebaseio.com",
});

const validateUserId = (userId) => {
  return firebaseAdminApp
    .auth()
    .getUser(userId)
    .then((user) => true)
    .catch((error) => false);
};

module.exports = { validateUserId };
