const admin = require('firebase-admin');

const serviceAccount = require("./configs/firebase-cert.json");

const os = require("os");
const hostName = os.hostname();
console.log(hostName);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kazi-bkgut-default-rtdb.europe-west1.firebasedatabase.app"
});

require('./events/dispense');