const express = require('express');
const cors = require('cors');
const app = express();

const serverConfig = require('./configs/server.json');

app.use(cors())

const auth = require('./auth').authReq
app.use(auth)

require('./router').router(app);


app.listen(serverConfig.PORT, () => {
    console.log(`kazi dispenser *:${serverConfig.PORT}`);
})


// require('./gpio').rotateStepper(180)


