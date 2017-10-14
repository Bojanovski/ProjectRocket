class Thruster extends Node {

	constructor(x, y, r, m) {
		super(x,y,r,m);
	}

	update() {
	}

	display(shipX, shipY) {
		super.display(shipX, shipY, [255, 0, 0]);
	}
}
