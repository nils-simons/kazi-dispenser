const gpio = require('../gpio');

const postDispense = (app) => {
    app.post('/api/dispense', async (req, res) => {
        await gpio.rotateStepper(180);
        res.sendStatus(200)
    })
}

exports.postDispense = postDispense