class Cell extends Node {

	constructor(x, y, r, m) {
		super(x,y,r,m);
	}

	update() {
	}

	display(shipX, shipY) {
		super.display(shipX, shipY, [200]);
	}
}
