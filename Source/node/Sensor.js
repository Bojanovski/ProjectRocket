class Sensor extends Node {

	constructor(x, y, r) {
		super(x, y, r);
		this.value = 0.0;
	}

	update(deltaTime) {
	}

	display(shipX, shipY) {
		super.display(shipX, shipY, [0, 0, 255]);
	}
	
	updateDir(listOfNodes) {
		var dir = createVector(0.0, 0.0);
		var myPos = createVector(this.x, this.y);
		for (var ni = 0; ni < listOfNodes.length; ni++) {
			var nodePos = createVector(listOfNodes[ni].x, listOfNodes[ni].y);
			var diff = p5.Vector.sub(myPos, nodePos);
			dir = p5.Vector.add(dir, diff);
		}
		
		dir.normalize();
		var angleNormalized = Math.acos(p5.Vector.dot(dir, createVector(0.0, -1.0))) / Math.PI;
		var sign = p5.Vector.dot(dir, createVector(1.0, 0.0));
		if (sign < 0.0) sign = -1.0;
		else sign = 1.0;
		var signalValue = sign * angleNormalized;
		
		print(signalValue);
	}
	
	isSensor() { return true; }
}
