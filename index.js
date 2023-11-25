const admin = require('firebase-admin');

const serviceAccount = require("./configs/firebase-cert.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kazi-bkgut-default-rtdb.europe-west1.firebasedatabase.app"
});

require('./events/dispense');