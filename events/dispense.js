const admin = require('firebase-admin');

const serverConfig = require('../configs/server.json');
const gpio = require('../gpio');
const logger = require('../utils/logger')

const db = admin.database();

const ref = db.ref(`/${serverConfig.DISPENSER_ID}/dispense`);

ref.on('value', async (snap) => {
  const data = snap.val();
  if (data == 0) { return }
  
  for (let i = 0; i < parseInt(data); i++) {
    logger.log('info', 'Start dispensing...')
    await gpio.rotateStepper(180)
    logger.log('info', 'Stop dispensing...')
    await new Promise(r => setTimeout(r, 1000));
  }

  db.ref(`/${serverConfig.DISPENSER_ID}`).update({dispense: 0});
});