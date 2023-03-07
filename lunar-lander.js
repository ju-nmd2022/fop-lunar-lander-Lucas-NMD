function setup() {
    createCanvas(800, 600);
    background(255);
}

let isRunning = false;
let isLanded = false;
let isGameOver = false;
let gravity = 0.1;
let thrust = 0;
let altitude = 0;
let velocity = 0;
const keys = {
  ArrowDown: {
    pressed: false
  },
  Space: {
    pressed: false
  } 
};

function draw() {
    if (!isRunning) {
      // Start screen
      background(0);
      fill(255);
      textSize(48);
      textAlign(CENTER);
      text('Lunar Landing', width/2, height/2 - 40);
      textSize(24);
      text('Use space or down arrow to control thrust', width/2, height/2 + 20);
      textSize(32);
      text('Click to start', width/2, height/2 + 80);
    } else {
      // Game screen
      background(0);
      fill(255);
      textSize(16); 
      textAlign(RIGHT);
      text('Altitude: ' + altitude.toFixed(2) + 'm', width - 20, 30);
      text('Velocity: ' + velocity.toFixed(2) + 'm/s', width - 20, 50);
      // Update spaceship position
      velocity += gravity - thrust;
      altitude += velocity;
      translate(320, height - 50 - altitude);
      fill('red')
      rect(350, 0, 20, 30)
      // Check for landing or crash
      if (altitude <= 0) {
        if (velocity <= 2) {
          isLanded = true;
        } else {
          isGameOver = true;
        }
      }
      // Game over logic
      if (isGameOver) {
        noLoop();
        textSize(48);
        textAlign(CENTER);
        fill(255, 0, 0);
        text(isLanded? 'Congratulations! You landed safely.' : 'Oops! You crashed.', width/2, height/2);
        textSize(32);
        text('Click to play again', width/2, height/2 + 60);
      }
    }
  }
  
  /* window.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowDown':
        velocity = 1;
        break;
    }
  });

  window.addEventListener('keyup', (e) => {
    switch (e.key) {
      case 'ArrowDown':
        velocity = 0;
        break;
    }
  }); */

  // Keyboard controls
function keyPressed() {
  if (keyCode === 32 || keyCode === DOWN_ARROW) {
    if (isRunning) {
      thrust = 0.3;
    }
  }
}
function keyReleased() {
  if (keyCode === 32 || keyCode === DOWN_ARROW) {
    if (isRunning) {
      thrust = 0;
    }
  }
}

// Start game
function mouseClicked() {
  if (!isRunning) {
    isRunning = true;
    loop();
  } else if (isGameOver) {
    isLanded = false;
    isGameOver = false;
    thrust = 0;
    altitude = 0;
    velocity = 0;
    loop();
  }
}
