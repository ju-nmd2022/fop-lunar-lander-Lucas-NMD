let rocketImg;

function preload() {
  rocketImg = loadImage('rocket.png');
}

function setup() {
  bg = loadImage('stars.jpg');
  createCanvas(800, 600);
}
let isRunning = false;
let isLanded = false;
let isGameOver = false;
let gravity = 0.1;
let velocity = 0;
let rocketY = 0;
const galaxySound = new Audio('voyageur-galactic-02-114568.mp3')

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
      galaxySound.play ();
      galaxySound.volume = 0.5;
      galaxySound.loop = true;
      // Draw moon surface
      fill('#cccccc');
      ellipseMode(CENTER);
      ellipse(width/2, height, width, 100);
      // Update spaceship position
      rocket (350, rocketY);
      rocketY += velocity;
      velocity += gravity;
      // Check for landing or crash
      if (rocketY + 30 >= 560) {
        if (velocity <= 3) {
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
  

  // Keyboard controls
function keyPressed() {
  if (keyCode === 32 || keyCode === DOWN_ARROW) {
    if (isRunning) { 
      rocketY -= 10;
      velocity -= 3;
    }
  }
}
function keyReleased() {
  if (keyCode === 32 || keyCode === DOWN_ARROW) {
    if (isRunning) {
      velocity = 0;
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
    velocity = 0;
    rocketY = 0;
    loop();
  }
}

function rocket(x, y) {
  image(rocketImg, x, y);
}

galaxySound.addEventListener('canplaythrough', () => {
  galaxySound.play();
});
