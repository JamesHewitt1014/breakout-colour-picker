
// COLOURS //
/*
- Random
*/

// THE PADDLE //
/*
Follows mouseX and mouseY
where on paddle the ball hits influences angle
*/

// THE BALL //
/*
Must reflect off walls + the PADDLE
when it hits a block it is destroyed and current colour set to that block
Angle decided by how it hits the paddle/wall/block
*/
//THE BLOCKS//
/*
 Have a colour value, when hit disappear and sets the ball colour to what their colour was
*/
//Other//
/*
Click to select colour
c to copy to clipboard
r to restart
*/

// this is the variable your picker should change
var pickedColor;
var paddle;
var blocks = [];
var rowLength;
var colLength;
var ball;
var r;
var b;
var g;

function preload(){
  hitSound = loadSound("beep.mp3");
  hitSound.volume(0.05);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textStyle(BOLD);
    pickedColor = color(255, 255, 255);
    paddle = new Paddle();
    rowLength = Math.floor(width/90);
    colLength = Math.floor(height/180); // Need to determine how many blocks there will be based on screen size?
    createObjects();
}

function createObjects() {
  started = false;
  ball = new Ball();
  var blockY = 0; // Isn't used? 
  
  for (var n = 0; n < colLength; n++) {
    for (var i = 0; i < rowLength; i++) {
      var r = Math.floor(Math.random() * 256); //A random value between 0 and 255
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      blocks[(n * rowLength) + i] = new Block(i, n, r, g, b, rowLength); // New array of blocks DEPENEDENT on width/height
    }
  }
}

var started = false;
var hidden = false;

function keyTyped() {
   if (key === ' '  && started == false) {
     started = true;
   } //  Makes selecting a colour possible
   else if (key === 'r' || key === 'R') {
     createObjects();
   } // Resets state and randomizes colours
   else if (key === 'c' || key === 'C'){
     window.prompt("RGB colour code can be copied here:", pickedColor);
   } // Allows the user to copy the colour to their clipboard
   else if (key === 's' || key === 'S') {
     if (!hidden) {
     document.getElementById("body").style.cursor = "none";
     hidden = true;
     }
     else {
     document.getElementById("body").style.cursor = "default";
     hidden = false;
     }

   }
   return false; // Default state
 }

function mousePressed(){
  pickedColor = (ball.colour); // Sets picked colour
}

function draw() {
    background(46);
    fill(pickedColor);
    text("" + red(pickedColor) + ", " + green(pickedColor) + ", " + blue(pickedColor), width - 50, height - 10); // Selected colour in bottom right corner
    fill(255,255,255);
    textAlign(CENTER);
    text("Press SPACE to start selecting a colour", width/2, height * 0.05)
        text("Press S to toggle the mouse cursor", width/2, height * 0.065);
    text("Click with the mouse to confirm your selection", width/2, height * 0.08)
    text("Press R to get a new random selection of colours", width/2, height * 0.095)
    text("Press C to copy to clipboard", width/2, height * 0.11); // Instructions


    paddle.draw();
    paddle.update();
    ball.draw(); // Draws objects
    ball.justHitSomething = false;
    for (var i = 0; i < (colLength * rowLength); i++){
      blocks[i].draw();
      ball.hitsBlock(blocks[i]);
    } // draws blocks and checks if they have been hit by the ball
    if (started){
      ball.update();
      ball.hitPaddle(paddle);
   } // If game has started then we update the ball and check if it is hitting the paddle
}
