class Node {

  	constructor(x, y) {
  		this.x = x;
  		this.y = y;
	}

	update() {
	}
	
	display(shipX, shipY) {
		fill(255,0,0);
		ellipse(shipX + this.x, shipY + this.y, 50.0, 50.0);
	}	
}