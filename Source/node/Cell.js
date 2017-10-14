class Cell extends Node {

	constructor(x, y, r) {
		super(x, y, r);
	}

	update(deltaTime) {
	}

	display(shipX, shipY) {
		super.display(shipX, shipY, [200]);
	}
}
