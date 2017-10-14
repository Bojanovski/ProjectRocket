class Node {

	constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;
	}

	update() {
	}

	display(shipX, shipY) {
		stroke(0, 0, 255);
		strokeWeight(0);
		fill(0, 0, 255);
		var diameter = this.r * 2.0;
		ellipse(shipX + this.x, shipY + this.y, diameter, diameter);
	}
}
