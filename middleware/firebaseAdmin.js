const admin = require("firebase-admin");
const serviceAccount = require("./../config/todoist_service_firebase_key.json");

const adminInit = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fbauthdemo-2a451.firebaseio.com",
  });
};

module.exports = { admin, adminInit };
