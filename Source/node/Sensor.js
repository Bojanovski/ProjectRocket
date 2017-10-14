class Sensor extends Node {

	constructor(x, y, r) {
		super(x, y, r);
		this.dir = createVector(0, 0);
	}

	update(deltaTime) {
	}

	display(shipX, shipY) {
		super.display(shipX, shipY, [0, 0, 255]);
	}
	
	updateDir(listOfNodes) {
		this.dir = createVector(0.0, 0.0);
		var myPos = createVector(this.x, this.y);
		for (var ni = 0; ni < listOfNodes.length; ni++) {
			var nodePos = createVector(listOfNodes[ni].x, listOfNodes[ni].y);
			var diff = p5.Vector.sub(myPos, nodePos);
			this.dir = p5.Vector.add(this.dir, diff);
		}
		
		this.dir.normalize();
		var angleNormalized = Math.acos(p5.Vector.dot(this.dir, createVector(0.0, -1.0))) / Math.PI;
		var sign = p5.Vector.dot(this.dir, createVector(1.0, 0.0));
		if (sign < 0.0) sign = -1.0;
		else sign = 1.0;
		var signalValue = sign * angleNormalized;
	}
	
	isSensor() { return true; }
	
	getDir() {
		return this.dir;
	}
}
