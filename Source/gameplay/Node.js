
var nodeIDCounter = 0;

class Node {

	constructor(x, y, r, m) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.m = m;

		this.id = nodeIDCounter++;
	}

	update() {
	}

	display(shipX, shipY, color) {
		if (color === undefined) color = [0, 0, 255];
		stroke(color);
		strokeWeight(0);
		fill(color);
		var diameter = this.r * 2.0;
		ellipse(shipX + this.x, shipY + this.y, diameter, diameter);
	}
}
