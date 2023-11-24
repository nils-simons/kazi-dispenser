const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const gpio = require('./gpio');
const auth = require('./auth').authReq


const serverConfig = require('./configs/server.json');
const serviceAccount = require("./configs/firebase-cert.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kazi-bkgut-default-rtdb.europe-west1.firebasedatabase.app"
});


const app = express();
const db = admin.database();


app.use(cors())
app.use(auth)

require('./router').router(app);

app.listen(serverConfig.PORT, () => {
    console.log(`kazi dispenser *:${serverConfig.PORT}`);
})

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



// require('./gpio').rotateStepper(180)


