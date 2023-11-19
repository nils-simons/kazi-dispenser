const rpio = require('rpio');

// GPIO pin configuration
const stepPin = 11; // GPIO pin for stepping
const directionPin = 12; // GPIO pin for direction

// Stepper motor configuration
const stepsPerRevolution = 200;

// Set up GPIO pins
rpio.open(stepPin, rpio.OUTPUT, rpio.LOW);
rpio.open(directionPin, rpio.OUTPUT, rpio.LOW);

// Move the stepper motor
function moveStepper() {
  const rpm = 5; // Set the speed in revolutions per minute

  // Set the direction (1 for clockwise, 0 for counterclockwise)
  rpio.write(directionPin, rpio.HIGH);

  // Calculate delay based on RPM
  const delay = Math.floor((60 * 1000) / (stepsPerRevolution * rpm));

  // Rotate 360 degrees (1 revolution)
  for (let step = 0; step < stepsPerRevolution; step++) {
    rpio.write(stepPin, rpio.HIGH);
    rpio.msleep(delay);
    rpio.write(stepPin, rpio.LOW);
    rpio.msleep(delay);
  }

  console.log('Stepper motor moved 360 degrees');
}

// Call the function to move the stepper motor
moveStepper();

// Close GPIO pins when done
rpio.close(stepPin);
rpio.close(directionPin);
