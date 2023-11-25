const serverConfig = require('../configs/server.json');
const gpio = require('./gpio');

const db = admin.database();

const ref = db.ref(`/${serverConfig.DISPENSER_ID}/dispense`);

ref.on('value', async (snap) => {
  const data = snap.val();
  if (data == 0) { return }
  
  for (let i = 0; i < parseInt(data); i++) {
    console.log('>>>> start dispensing')
    await gpio.rotateStepper(180)
    console.log('>>>> end dispensing')
    await new Promise(r => setTimeout(r, 1000));
  }

  db.ref(`/${serverConfig.DISPENSER_ID}`).update({dispense: 0});
});