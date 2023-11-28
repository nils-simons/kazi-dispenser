const admin = require('firebase-admin');

const serverConfig = require('../configs/server.json');
const gpio = require('../gpio');
const logger = require('../utils/logger');

const db = admin.database();

const ref = db.ref(`/${serverConfig.DISPENSER_ID}/calib`);

ref.on('value', async (snap) => {
  const data = snap.val();
  if (data == 0) { return }
  logger.log('info', 'Start calibrating...')
  await gpio.rotateStepper(data)
  logger.log('info', 'Stop calibrating...')
  db.ref(`/${serverConfig.DISPENSER_ID}`).update({calib: 0});
});