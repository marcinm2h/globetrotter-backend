const firebaseAdmin = require("firebase-admin");
const FIREBASE_DATABASE_URL =
  process.env.FIREBASE_DATABASE_URL || "https://prm02-ac0cf.firebaseio.com";

const firebaseAdminApp = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(),
  databaseURL: FIREBASE_DATABASE_URL,
});

const validateUserId = (userId) => {
  return firebaseAdminApp
    .auth()
    .getUser(userId)
    .then((user) => true)
    .catch((error) => false);
};

module.exports = { validateUserId };
