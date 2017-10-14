class Node {

	constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;
	}

	update() {
	}

	display(shipX, shipY) {
		fill(255,0,0);
		var diameter = this.r * 2.0;
		ellipse(shipX + this.x, shipY + this.y, diameter, diameter);
	}
}
