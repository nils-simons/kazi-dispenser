const admin = require('firebase-admin');

const logger = require('./utils/logger');
const serviceAccount = require("./configs/firebase-cert.json");
const serverConf = require("./configs/server.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kazi-bkgut-default-rtdb.europe-west1.firebasedatabase.app"
});

require('./events/dispense');
require('./events/calib');


logger.log('system', `Dispenser "${serverConf.DISPENSER_ID}" started`)
