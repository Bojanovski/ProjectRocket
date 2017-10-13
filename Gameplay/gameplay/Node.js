class Node {

  	constructor(x, y) {
  		this.x = x;
  		this.y = y;
	}

	update() {
	}
	
	display(shipX, shipY) {
		fill(255,0,0);
		ellipse(shipX + this.x, shipY + this.y, 30.0, 30.0);
	}	
}