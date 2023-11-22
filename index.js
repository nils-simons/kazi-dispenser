const Gpio = require('pigpio').Gpio;

// Define GPIO pins for the stepper motor
const IN1 = new Gpio(17, { mode: Gpio.OUTPUT });
const IN2 = new Gpio(27, { mode: Gpio.OUTPUT });
const IN3 = new Gpio(22, { mode: Gpio.OUTPUT });
const IN4 = new Gpio(23, { mode: Gpio.OUTPUT });

// Define the sequence of steps for the stepper motor
const sequence = [
  [1, 0, 0, 1],
  [1, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 1, 1],
  [0, 0, 0, 1]
];

let stepCounter = 0;

function setStep(step) {
  IN1.digitalWrite(sequence[step][0]);
  IN2.digitalWrite(sequence[step][1]);
  IN3.digitalWrite(sequence[step][2]);
  IN4.digitalWrite(sequence[step][3]);
}

function rotateStepper(degrees, delay) {
  const steps = Math.floor((512 / 360) * degrees); // Adjust the steps per degree as needed

  for (let i = 0; i < steps; i++) {
    setStep(stepCounter % 8);
    stepCounter++;
    if (stepCounter === 8) {
      stepCounter = 0;
    }
    sleep(delay);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Example: Rotate the stepper motor 90 degrees with a delay of 5 milliseconds between steps
rotateStepper(90, 5);
