class Pipe extends Link {

	constructor(nodes) {
		super(nodes);
	}

  display(shipX, shipY) {
    super.display(shipX, shipY, [0, 0, 255]);
	}

}
