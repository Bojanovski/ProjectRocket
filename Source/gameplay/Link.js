
var elasticityCoefficient = 1000.0;

class Link {

	constructor(nodes) {
		this.nodes = nodes;
		this.restingLength = Math.sqrt(Math.pow(nodes[0].x - nodes[1].x, 2) + Math.pow(nodes[0].y - nodes[1].y, 2));
	}

	update() {
	}

	display(shipX, shipY) {
		this.display(shipY, shipY, [255, 0, 0]);
	}

	display(shipX, shipY, color) {
		// check if there are at least two nodes
		if (this.nodes.length >= 2) {
			stroke(color);
			strokeWeight(4);
			line(shipX + this.nodes[0].x, shipY + this.nodes[0].y, shipX + this.nodes[1].x, shipY + this.nodes[1].y);
		}
	}
}
