class Sensor extends Node {

	constructor(x, y, r) {
		super(x, y, r);
		this.value = 0.0;
		this.isSensor = true;
	}

	update() {
	}

	display(shipX, shipY) {
		super.display(shipX, shipY, [0, 0, 255]);
	}
}
