// Copyright 2017 Bojan Lovrovic, Jakub Lawicki, Stanislaw Rymkiewicz

class Strut extends Link {

	constructor(nodes) {
		super(nodes);
	}

  display(shipX, shipY) {
    super.display(shipX, shipY, [100]);
	}

}
