function Paddle() {
  this.x = width/2;
  this.y = height * 0.95;
  this.length = width/11;

  this.draw = function() {
    fill(255);
    rect(this.x, this.y, this.length, height*0.008);
  } // Just a rectangle

  this.update = function() {
    this.x = mouseX - (this.length/2); // Follows mouse X
  }
}
