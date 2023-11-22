var gpio = require("onoff").Gpio;

// Use GPIO pin numbers
var stepPins = [17, 27, 22, 23];
var pins = [];
var stepCounter = 0;
var timeout = 0.01;
var stepsPerRevolution = 4096; // Steps per one revolution (adjust according to your motor specifications)

Seq = [];
Seq[0] = [1, 0, 0, 0];
Seq[1] = [1, 1, 0, 0];
Seq[2] = [0, 1, 0, 0];
Seq[3] = [0, 1, 1, 0];
Seq[4] = [0, 0, 1, 0];
Seq[5] = [0, 0, 1, 1];
Seq[6] = [0, 0, 0, 1];
Seq[7] = [1, 0, 0, 1];

for (var i = 0; i < stepPins.length; i++) {
  pins[i] = new gpio(stepPins[i], 'out');
}

function rotateStepper(degrees) {
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
    }
  }

  step();
}

// Example: Rotate the stepper motor 90 degrees
rotateStepper(180);
