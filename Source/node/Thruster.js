class Thruster extends Node {

	constructor(x, y, r) {
		super(x, y, r);
		this.value = 0.0;
		this.isThruster = true;
	}

	update() {
	}

	display(shipX, shipY) {
		super.display(shipX, shipY, [255, 0, 0]);
	}
}
