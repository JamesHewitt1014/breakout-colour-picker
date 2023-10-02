function Block(x, y, r, g, b, rowLength) {
    this.size = width/rowLength;  // Size is the width/ rowlength
    this.x = x * this.size; // is x + size (x will be 0,1,2,3,4,5,6 etc it is position in the row)
    this.y = (y * this.size) + (height * 0.2); // based on position in column
    this.isDestroyed = false;
    this.blockBelow = false;
    this.blockBelow = false;

    this.colour = color(r, g, b);

    this.draw = function() {
      if (!this.isDestroyed) {
        fill(r, g, b);
        rect(this.x, this.y, this.size, this.size); // Wont draw if destroyed
      }
    }
}
