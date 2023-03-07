function setup() {
  bg = loadImage('stars.jpg');
  createCanvas(800, 600);
}
let isRunning = false;
let isLanded = false;
let isGameOver = false;
let gravity = 0.2;
let thrust = 0;
let velocity = 0;
let rocketY = -100;
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
      background(bg);
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
      background(bg);
      fill(255);
      textSize(16); 
      textAlign(RIGHT);
      text('Velocity: ' + velocity.toFixed(2) + 'm/s', width - 20, 50);
      // Update spaceship position
      velocity += gravity - thrust;
      rocket (350, rocketY);
      rocketY += velocity;
      // Check for landing or crash
      if (rocketY >= height) {
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
    velocity = 0;
    loop();
  }
}

function rocket(x, y) {
  fill('red');
  rect(x, y, 20, 30);
}