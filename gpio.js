let DEV = false;
try {
  const gpio = require("onoff").Gpio;
  DEV = false;
} catch (error) {
  DEV = true;
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


try {
  for (var i = 0; i < gpioConf.STEPPER.out.length; i++) {
    pins[i] = new gpio(gpioConf.STEPPER.out[i], 'out');
  }
  DEV = false;
} catch (error) {
  DEV = true;
}



function rotateStepper(degrees=180) {
  return new Promise(async (resolve, reject) => {


    if (DEV) {
      console.log('Simulating...');
      await new Promise(r => setTimeout(r, 1000));
      resolve(true)
      return
    }

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