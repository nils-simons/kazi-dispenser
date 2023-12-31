let DEV = false;

const os = require("os");
var logger = require('./utils/logger');

const hostName = os.hostname();

if (hostName !== 'kazi') {
  DEV = true;
}

logger.log('system', `DEVELOPMENT: ${DEV}`)


let gpio
if (!DEV) {
  gpio = require("onoff").Gpio;
}

var gpioConf = require('./configs/gpio.json');

var pins = [];
var stepCounter = 0;
var timeout = 0.01;
var stepsPerRevolution = 4096;

Seq = [];
Seq[0] = [1, 0, 0, 0];
Seq[1] = [1, 1, 0, 0];
Seq[2] = [0, 1, 0, 0];
Seq[3] = [0, 1, 1, 0];
Seq[4] = [0, 0, 1, 0];
Seq[5] = [0, 0, 1, 1];
Seq[6] = [0, 0, 0, 1];
Seq[7] = [1, 0, 0, 1];


if (!DEV) {
  for (var i = 0; i < gpioConf.STEPPER.out.length; i++) {
    pins[i] = new gpio(gpioConf.STEPPER.out[i], 'out');
  }
}

function rotateStepper(degrees=180) {
  return new Promise(async (resolve, reject) => {


    if (DEV) {
      logger.log('success', `Rotating ${degrees}° (Simulation)`)
      await new Promise(r => setTimeout(r, 1000));
      resolve(true)
      return
    }

    logger.log('success', `Rotating ${degrees}°`)
    var steps = Math.floor((stepsPerRevolution / 360) * degrees);
    function step() {
      for (var pin = 0; pin < 4; pin++) {
        if (Seq[stepCounter][pin] !== 0) {
          pins[pin].writeSync(1);
        } else {
          pins[pin].writeSync(0);
        }
      }
      stepCounter += 1;
      if (stepCounter === 8) {
        stepCounter = 0;
      }
  
      if (steps > 0) {
        steps--;
        setTimeout(step, timeout);
      } else {
        resolve(true);
      }
    }
      
    step();
  })

}

exports.rotateStepper = rotateStepper;