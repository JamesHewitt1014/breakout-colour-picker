function Ball() {
  this.x = width/2;
  this.y = height * 0.8; // Starting location
  this.angle = 0;
  this.speed = height/200; // angle = change in x, speed = change in y
  this.colour = color(255, 255, 255); // Starts white

  this.getDiameter = function() {
    if(height*0.011 <= 15) {
      return 20;
    }
    else {
      return height*0.011;
    }
  }
  this.diameter = this.getDiameter(); //Size of the ball
  this.radius = this.diameter * 0.50;
  this.justHitSomething = false; //To stop it from changing direction incorrectly when it hits multiple blocks

  this.draw = function() {
    fill(this.colour);
    ellipse (this.x, this.y, this.diameter, this.diameter); // Draws the ball
  }

  this.update = function() {
    this.x = this.x + this.angle;
    this.y = this.y + this.speed; // Changes x and y coords
    if (this.x <= 0  || this.x >= width){
      this.flipAngle();
    }
    else if (this.y <= 0) {
      this.changeDirection();
    } // Changes the angle / direction to stop it from going out of bounds
    else if (this.y >= height) // below paddle
    {
      this.colour = color(0, 0, 0);
      this.angle = 0;
      this.speed = 0; // stops it from moving
    }
  }

  this.flipAngle = function() {
    this.angle = this.angle * -1;
  } // Flips the angle

  this.changeDirection = function() {
    this.speed = this.speed * -1; //  Makes it go down instead of up or vive versa
  }

  this.hitPaddle = function(paddle) {
    if (paddle.y - this.y <= this.radius && this.y <= paddle.y) // When the difference in Y between the ball and the paddle is less than or equal to 0.50 of its diameter (I thought origanlly that just its radius would w) and the ball isn't below the paddle
    {
      if ((this.x + this.radius) >= paddle.x && this.x <= (paddle.x + (paddle.length/2))) // When the ball collides with the left side of the paddle
      {
         this.changeDirection();
         this.angle = ((this.x - paddle.x) - paddle.length/2) * 0.1; //Sets the amount the ball is travelling in the x direction depending on the angle it hits the paddle
          hitSound.play();
      }
      else if (this.x >= (paddle.x + (paddle.length/2)) && (this.x - this.radius) <= (paddle.x + paddle.length)) // When the ball collides with the right side of the paddle
      {
         this.changeDirection();
         this.angle = (this.x - (paddle.x + paddle.length/2)) * 0.1; // Similar to line 56
         hitSound.play();
      }
    }
  }


  this.hitsBlock = function(block) {
    if (this.x + this.radius >= block.x && (this.x - this.radius) <= (block.x + block.size) && !block.isDestroyed) {
      if (this.y >= block.y + this.radius && this.y <= (block.y + block.size)- this.radius) {
        if(!this.justHitSomething){ // If it hits the sides of a block then flip angle, destroy block, change colour etc
        this.flipAngle();}
        block.isDestroyed = true;
        this.justHitSomething = true;
        this.colour = block.colour;
        hitSound.play();
      } // There is a case that isn't covered -- if the ball lands vertically between two blocks on top of each other it will bounce downwards when really it should just flipAngle and the above if statement doesn't include when the ball hits the side of a block (not top or bottom) but isn't below the radius on the Y level so overall while collision detection is acceptable it could be better (as this is a rare case)
      else if (this.y + this.radius >= block.y && this.y - this.radius <= (block.y + block.size)){ // If it hits the bottom of a block change direction, destroy block, change colour, etc
        if(!this.justHitSomething){
        this.changeDirection();}
        block.isDestroyed = true;
        this.justHitSomething = true;
        this.colour = block.colour;
        hitSound.play();
      }
    }
  }
}
